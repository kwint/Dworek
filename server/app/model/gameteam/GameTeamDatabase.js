/******************************************************************************
 * Copyright (c) Dworek 2016. All rights reserved.                            *
 *                                                                            *
 * @author Tim Visee                                                          *
 * @website http://timvisee.com/                                              *
 *                                                                            *
 * Open Source != No Copyright                                                *
 *                                                                            *
 * Permission is hereby granted, free of charge, to any person obtaining a    *
 * copy of this software and associated documentation files (the "Software"), *
 * to deal in the Software without restriction, including without limitation  *
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,   *
 * and/or sell copies of the Software, and to permit persons to whom the      *
 * Software is furnished to do so, subject to the following conditions:       *
 *                                                                            *
 * The above copyright notice and this permission notice shall be included    *
 * in all copies or substantial portions of the Software.                     *
 *                                                                            *
 * You should have received a copy of The MIT License (MIT) along with this   *
 * program. If not, see <http://opensource.org/licenses/MIT/>.                *
 ******************************************************************************/

var _ = require('lodash');

var Core = require('../../../Core');
var MongoUtil = require('../../mongo/MongoUtils');

/**
 * Constructor.
 *
 * @returns {GameTeamDatabase} GameTeamDatabase instance.
 */
var GameTeamDatabase = function() {};

/**
 * Database collection name.
 */
GameTeamDatabase.DB_COLLECTION_NAME = 'game_team';

/**
 * Add a new team to a game.
 *
 * @param {GameModel} game Game.
 * @param {String} teamName Team name.
 * @param {function} callback (err, {GameTeamModel} gameTeam) Callback.
 */
GameTeamDatabase.addGameTeam = function(game, teamName, callback) {
    // Get the database instance
    const db = MongoUtil.getConnection();

    // Create the object to insert
    // TODO: Dynamically get the proper field names from the model configuration
    const insertObject = {
        game_id: game.getId(),
        name: teamName
    };

    // Insert the game team into the database
    db.collection(GameTeamDatabase.DB_COLLECTION_NAME).insertOne(insertObject, function(err) {
        // Handle errors and make sure the status is ok
        if(err !== null) {
            // Show a warning and call back with the error
            console.warn('Unable to create new game team, failed to insert game team into database.');
            callback(err, null);
            return;
        }

        // Flush the cache for the model manager
        Core.model.gameTeamModelManager.flushCache(function(err) {
            // Call back errors
            if(err !== null) {
                callback(err);
                return;
            }

            // Call back with the inserted ID
            callback(null, Core.model.gameTeamModelManager._instanceManager.create(insertObject._id));
        });
    });
};

/**
 * Do a find query on the API token database. Parse the result as an array through a callback.
 *
 * @param a First find parameter.
 * @param b Second find parameter.
 * @param {Object} [options] Additional options.
 * @param {Number} [options.limit] Number of items to limit the result to.
 * @param {string} [options.sortField=] Field to sort on.
 * @param {boolean} [options.sortAscending=true] True to sort in ascending order, false to sort in descending order.
 * @param {function} callback (err, data) Callback.
 */
// TODO: Copy this updated function to other Model Database instances too
GameTeamDatabase.layerFetchFieldsFromDatabase = function(a, b, options, callback) {
    // Get the database instance
    var db = MongoUtil.getConnection();

    // Set the callback parameter if the options parameter was left out
    if(_.isFunction(options)) {
        //noinspection JSValidateTypes
        callback = options;
        options = {};
    }

    // Create the find query
    var findQuery = db.collection(GameTeamDatabase.DB_COLLECTION_NAME).find(a, b);

    // Sort the results
    if(options.hasOwnProperty('sortField')) {
        // TODO: Translate the field name to MongoDB

        // Set the sorting order property if not set
        if(!options.hasOwnProperty('sortAscending'))
            options.sortAscending = true;

        // Sort
        findQuery = findQuery.sort(options.sortField, options.sortAscending ? 1 : -1);
    }

    // Limit the results
    //noinspection JSValidateTypes
    if(options.hasOwnProperty('limit') && options.limit !== undefined)
        findQuery = findQuery.limit(options.limit);

    // Convert the results into an array and call back
    findQuery.toArray(callback);
};

// Export the user database module
module.exports = GameTeamDatabase;
