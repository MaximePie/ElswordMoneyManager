<?php

namespace App\Http\Controllers;

use App\Equipment;
use App\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class EquipmentController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return JsonResponse
	 */
	public function index()
	{
		return response()->json(['equipments' => Equipment::query()->orderBy('price', 'asc')->get()]);
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Builder|Model|object
	 */
	public function nextTarget()
	{
		$nextTarget = Equipment::query()
			->where('isBought', false)
			->orderBy('price', 'asc')->first();
		return response()->json(['nextEquipment' => $nextTarget]);
	}


	/**
	 * Set the equipment to bought
	 *
	 * @param Equipment $equipment
	 * @return Equipment
	 */
	public function afford(Equipment $equipment)
	{
		$equipment->isBought = true;
		$equipment->save();
		return $equipment;
	}


	/**
	 * Store a newly created resource in storage.
	 *
	 * @param Request $request
	 * @return Response
	 */
	public function store(Request $request)
	{
		return Equipment::create(['name' => $request->get('name'), 'price' => $request->get('price')]);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param Equipment $equipment
	 * @return Response
	 */
	public function show(Equipment $equipment)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param Equipment $equipment
	 * @return Response
	 */
	public function edit(Equipment $equipment)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param Request $request
	 * @param Equipment $equipment
	 * @return void
	 */
	public function update(Request $request, Equipment $equipment)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param Equipment $equipment
	 * @return void
	 */
	public function destroy(Equipment $equipment)
	{
		$equipment->forceDelete();
	}
}
