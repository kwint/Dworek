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

/******************************************************************************
 * Configuration base.                                                        *
 ******************************************************************************/
var config = {};
config.debug = {};
config.db = {};
config.redis = {};
config.cache = {};
config.api = {};
config.realtime = {};
config.web = {};
config.user = {};
config.security = {};
config.session = {};
config.validation = {};
config.game = {};


/******************************************************************************
 * Application debug configuration.                                           *
 ******************************************************************************/

/**
 * NodeJS debug name for the server.
 * @type {string}
 */
config.debug.name = 'dworek:server';


/******************************************************************************
 * MongoDB database configuration.                                            *
 ******************************************************************************/

/**
 * MongoDB host.
 * @type {string}
 */
config.db.host = '127.0.0.1';

/**
 * MongoDB port.
 * @type {number}
 */
config.db.port = 27017;

/**
 * MongoDB database name.
 * @type {string}
 */
config.db.db = 'dworek';

/**
 * Maximum number of allowed connections in MongoDB connection pool.
 * @type {number}
 */
config.db.maxConnectionPoolSize = 20;

/**
 * MongoDB connection URL.
 * @type {string}
 */
config.db.url = 'mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.db + '?maxPoolSize=' + config.db.maxConnectionPoolSize;


/******************************************************************************
 * Redis cache configuration.                                                 *
 ******************************************************************************/

/**
 * Define whether to enable/usage Redis.
 * @type {boolean}
 */
config.redis.enable = true;

/**
 * Redis host.
 * @type {string}
 */
config.redis.host = '127.0.0.1';

/**
 * Redis port.
 * @type {number}
 */
config.redis.port = 6379;

/**
 * Redis database number.
 * @type {number}
 */
config.redis.dbNumber = 1;

/**
 * Redis connection URL.
 * @type {string}
 */
config.redis.url = 'redis://' + config.redis.host + ':' + config.redis.port + '/' + config.redis.dbNumber;

/**
 * Default number of seconds it takes for cached values to expire.
 * @type {number}
 */
config.redis.cacheExpire = 60 * 5;


/******************************************************************************
 * Cache configuration.                                                       *
 ******************************************************************************/

/**
 * Internal cache section.
 * @type {Object}
 */
config.cache.internal = {};

/**
 * Interval in milliseconds to flush the internal cache.
 * @type {*|number}
 */
config.cache.internal.flushInterval = 5 * 60 * 1000;


/******************************************************************************
 * Web configuration.                                                         *
 ******************************************************************************/

/**
 * Web server listening port.
 * @type {*|number}
 */
config.web.port = process.env.WEB_PORT || 3000;

/**
 * Define whether to automatically fix malformed URLs.
 * @type {boolean}
 */
config.web.fixUrl = true;


/******************************************************************************
 * Real time configuration.                                                   *
 ******************************************************************************/

/**
 * Port that is used for the real time server.
 * Uses the same port as the web interface by default.
 * @type {*|number}
 */
config.realtime.port = config.web.port;

/**
 * The public path that is used for the real time server.
 * @type {string} Real time web path.
 */
config.realtime.path = '/realtime';

/**
 * The default room name for real time packets.
 * @type {string} Room name.
 */
config.realtime.defaultRoom = 'default';


/******************************************************************************
 * Security configuration.                                                    *
 ******************************************************************************/

/**
 * Number of rounds to hash.
 * @type {string}
 */
config.security.hashRounds = 6;

/**
 * Global salt used with hashing.
 * @type {string}
 */
config.security.globalSalt = 'mKd5xolXY6JCnLUkRZjmgjHsdkVK9dSiUg0m69z4'; // Examples: https://goo.gl/iAzWfz

/**
 * Default length of tokens, such as session tokens.
 * @type {int}
 */
config.security.tokenLength = 64;


/******************************************************************************
 * Session configuration.                                                     *
 ******************************************************************************/

/**
 * Default token length in characters.
 * @type {int}
 */
config.session.tokenLength = config.security.tokenLength;

/**
 * Maximum lifetime in seconds of a session.
 * @type {int}
 */
config.session.expire = 60 * 60 * 24 * 365;

/**
 * Number of seconds a session expires after it has been unused.
 * @type {number}
 */
config.session.expireUnused = 60 * 60 * 24 * 16;

/**
 * Name of the session token cookie.
 * @type {string}
 */
config.session.cookieName = 'session_token';


/******************************************************************************
 * Validation configuration.                                                  *
 ******************************************************************************/

/**
 * Minimum number of password characters.
 * @type {int}
 */
config.validation.passwordMinLength = 4;

/**
 * Maximum number of password characters.
 * @type {int}
 */
config.validation.passwordMaxLength = 128;

/**
 * Minimum number of name characters.
 * @type {int}
 */
config.validation.nameMinLength = 2;

/**
 * Maximum number of name characters.
 * @type {int}
 */
config.validation.nameMaxLength = 128;

/**
 * Minimum number of nickname characters.
 * @type {int}
 */
config.validation.nicknameMinLength = 1;

/**
 * Maximum number of nickname characters.
 * @type {int}
 */
config.validation.nicknameMaxLength = 32;

/**
 * Minimum number of team name characters.
 * @type {int}
 */
config.validation.teamNameMinLength = 1;

/**
 * Maximum number of team name characters.
 * @type {int}
 */
config.validation.teamNameMaxLength = 64;

/**
 * Minimum number of factory name characters.
 * @type {int}
 */
config.validation.factoryNameMinLength = 1;

/**
 * Maximum number of factory name characters.
 * @type {int}
 */
config.validation.factoryNameMaxLength = 64;


/******************************************************************************
 * Game configuration.                                                        *
 ******************************************************************************/

/**
 * Location decay time in milliseconds.
 * @type {number}
 */
config.game.locationDecayTime = 30 * 1000;

/**
 * Update interval in milliseconds to send new location updates.
 * @type {number}
 */
config.game.locationUpdateInterval = 5 * 1000;


// Export the configuration
module.exports = config;
