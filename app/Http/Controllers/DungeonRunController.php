<?php

namespace App\Http\Controllers;

use App\Dungeon;
use App\DungeonRun;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DungeonRunController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        //
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
	 * @param Dungeon $dungeon
	 * @param Request $request
	 * @return void
	 */
    public function store(Dungeon $dungeon, Request $request)
    {
        return DungeonRun::Create([
        	'earnedCoins' => $request->earnedCoins,
					'dungeon_id' => $dungeon->id,
					'time' => $request->time
				]);
    }

    /**
     * Display the specified resource.
     *
     * @param DungeonRun $dungeonRun
     * @return Response
     */
    public function show(DungeonRun $dungeonRun)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param DungeonRun $dungeonRun
     * @return Response
     */
    public function edit(DungeonRun $dungeonRun)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param DungeonRun $dungeonRun
     * @return Response
     */
    public function update(Request $request, DungeonRun $dungeonRun)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param DungeonRun $dungeonRun
     * @return Response
     */
    public function destroy(DungeonRun $dungeonRun)
    {
        //
    }
}
