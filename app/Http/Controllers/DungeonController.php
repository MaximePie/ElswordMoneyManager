<?php

namespace App\Http\Controllers;

use App\Dungeon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DungeonController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return JsonResponse
	 */
	public function index()
	{
		$dungeons = Dungeon::all();
		$dungeons->each(function (Dungeon $dungeon) {
			$dungeon['averageTime'] = $dungeon->averageTime();
			$dungeon['averageRewards'] = $dungeon->averageRewards();
		});

		return response()->json(['dungeons' => $dungeons]);
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param Request $request
	 * @return Response
	 */
	public function store(Request $request)
	{
		Dungeon::Create(['name' => $request->name]);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param Dungeon $dungeon
	 * @return Response
	 */
	public function show(Dungeon $dungeon)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param Dungeon $dungeon
	 * @return Response
	 */
	public function edit(Dungeon $dungeon)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param Request $request
	 * @param Dungeon $dungeon
	 * @return Response
	 */
	public function update(Request $request, Dungeon $dungeon)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param Dungeon $dungeon
	 * @return Response
	 */
	public function destroy(Dungeon $dungeon)
	{
		//
	}
}
