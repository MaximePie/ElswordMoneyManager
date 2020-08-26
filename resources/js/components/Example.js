import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import server from "../server";
import "../../sass/base.scss";

import Inputzone from "./Inputzone";

function App() {

    const [product, setProduct] = React.useState('');
    const [characterName, setCharacterName] = React.useState('');
    const [productsList, setProductsList] = React.useState([]);
    const [charactersList, setCharactersList] = React.useState([]);
    const [editedProduct, setEditedProduct] = React.useState(undefined);
    const [selectedCharacter, setSelectedCharacter] = React.useState(undefined);
    const [productPrices, setProductPrices] = React.useState(undefined);
    const [price, setPrice] = React.useState(undefined);

    useEffect(() => {
        fetchProducts();
        fetchCharacters();
    }, []);

    useEffect(() => {
        if (editedProduct) {
            fetchProductPrices();
        }
    }, [editedProduct]);

    return (
        <div className="App">
            <div className="App__content">
                <div className="App__characterName">
                    Character :
                    <input type="text" className="App__field" onChange={(event) => {
                        setCharacterName(event.target.value)
                    }}/>
                    <button onClick={createCharacter} type="submit">Enregistrer</button>
                </div>
                <div className="App__productName">
                    Produit :
                    <input type="text" className="App__field" onChange={(event) => {
                        setProduct(event.target.value)
                    }}/>
                    {charactersList.length !== 0 && (
                        <select name="character" onChange={(event) => {
                            setSelectedCharacter(event.target.value)
                        }}>
                            <option value={null}/>
                            {charactersList.map((character) => {
                                return (
                                    <option value={character.id}>
                                        {character.name}
                                    </option>
                                )
                            })}
                        </select>
                    )}
                    <button onClick={createProduct} type="submit">Enregistrer</button>
                </div>
                <div className="App__products-list">
                    {productsList.map(product => {
                        return (
                            <div className="Product">
                                <span className="Product__field">
                                    {product.name + ' '}
                                </span>
                                <span className="Product__field">
                                    {product.current_price + ' '}
                                </span>
                                <span className="Product__field">
                                    {charactersList.length !== 0 && (
                                        <select name="character" value={product.character?.id}
                                                onChange={
                                                    (event) => {
                                                        updateSelectedCharacter(event.target.value, product.id)
                                                    }
                                                }>
                                            <option value={null}/>
                                            {charactersList.map((character) => {
                                                return (
                                                    <option value={character.id}>
                                                        {character.name}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    )}
                                </span>
                                <span className="Product__field">
                                    <button onClick={() => deleteProduct(product.id)}>Supprimer</button>
                                </span>

                                <span className="Product__field">
                                    <button onClick={() => setEditedProduct({...product})}>Editer</button>
                                </span>
                                <span className="Product__field">
                                    <button onClick={() => {
                                        updateCurrentPrice(product, true)
                                    }}>
                                        J'ai vendu !
                                    </button>
                                </span>
                                <span className="Product__field">
                                    <button onClick={() => {
                                        updateCurrentPrice(product, false)
                                    }}>
                                        J'ai pas vendu !
                                    </button>
                                </span>
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
        </div>
    );

    /**
     * Sends character name to the backoffice to create an item
     */
    function createCharacter() {
        server.post('character', {name: characterName}).then(() => {
            fetchCharacters();
            setCharacterName('');
        });
    }

    /**
     * Sends product name to the backoffice to create an item
     */
    function createProduct() {
        server.post('product', {name: product, selectedCharacter}).then(() => {
            setProduct('');
            fetchProducts();
        });
    }

    /**
     * Fetch the Characters and set it
     */
    function fetchCharacters() {
        server.get('characters').then((response) => {
            const {characters} = response.data;
            if (characters) {
                setCharactersList(characters)
            }
        })
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

    /**
     * Update the selected character
     */
    function updateSelectedCharacter(characterId, productId) {
        server.post(`updateSelectedCharacter/${productId}`, {characterId}
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
