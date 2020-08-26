import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import server from "../server";

function App() {

    const [product, setProduct] = React.useState('');
    const [productsList, setProductsList] = React.useState([]);
    const [editedProduct, setEditedProduct] = React.useState(undefined);
    const [productPrices, setProductPrices] = React.useState(undefined);
    const [price, setPrice] = React.useState(undefined);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (editedProduct) {
            fetchProductPrices();
        }
    }, [editedProduct]);

    return (
        <div className="App">
            <input type="text" className="App__field" onChange={(event) => {
                setProduct(event.target.value)
            }}/>
            <button onClick={createProduct} type="submit">Enregistrer</button>
            <div className="App__products-list">
                {productsList.map(product => {
                    return (
                        <div>
                            {product.name + ' '}
                            {product.current_price + ' '}
                            <button onClick={() => deleteProduct(product.id)}>Supprimer</button>
                            <button onClick={() => setEditedProduct({...product})}>Editer</button>
                            <button onClick={() => {
                                updateCurrentPrice(product, true)
                            }}>J'ai vendu !
                            </button>
                            <button onClick={() => {
                                updateCurrentPrice(product, false)
                            }}>J'ai pas vendu !
                            </button>
                        </div>
                    )
                })}
            </div>
            {editedProduct && (
                <div className="App_product">
                    <h3>{editedProduct.name}</h3>
                    {productPrices && productPrices.map((price) => {
                        return (
                            <div className="App__price">
                                {' ' + price.price}
                                {' ' + price.success}
                                {' ' + price.failed}
                                {' ' + price.rate}%
                            </div>
                        )
                    })}
                    <input type="text" className="App__field" onChange={(event) => {
                        setPrice(event.target.value)
                    }}/>
                    <button onClick={createProductPrice} type="submit">Enregistrer</button>
                </div>
            )}
        </div>
    );

    /**
     * Sends product name to the backoffice to create an item
     */
    function createProduct() {
        server.post('product', {name: product}).then(() => {
            setProduct('');
            fetchProducts();
        });
    }

    /**
     * Fetch the products and set it
     */
    function fetchProducts() {
        server.get('products').then((response) => {
            const {products} = response.data;
            if (products) {
                setProductsList(products)
            }
        })
    }

    /**
     * Deletes the targeted product
     * @param productId
     */
    function deleteProduct(productId) {
        server.get(`products/delete/${productId}`).then(fetchProducts);
    }

    /**
     * Fetch the ProductInfo and set it
     */
    function fetchProductPrices() {
        server.get(`product/${editedProduct.id}`).then((response) => {
            const {productPrices} = response.data;
            if (productPrices) {
                setProductPrices(productPrices)
            }
        })
    }

    /**
     * Create the Product Price
     */
    function createProductPrice() {
        server.post('productPrice', {price, productId: editedProduct.id}).then(() => {
            setPrice('');
            fetchProductPrices();
        });
    }

    /**
     * Update the current price
     */
    function updateCurrentPrice(updatedProduct, success) {
        server.post('updateProductPrice',
            {productPriceId: updatedProduct.current_price_id, success, productId: updatedProduct.id}
            ).then(() => {
            fetchProducts();
            if (editedProduct) {
                fetchProductPrices();
            }
        })
    }
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App/>, document.getElementById('root'));
}
