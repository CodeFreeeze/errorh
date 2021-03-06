'use strict';

const Inert = require('inert');
const Boom = require('boom');
const Code = require('code');
const Lab = require('lab');
const Hapi = require('hapi');
const Plugin = require('../');

const expect = Code.expect;
const lab = exports.lab = Lab.script();
const beforeEach = lab.beforeEach;
const describe = lab.describe;
const it = lab.it;

describe('registration and functionality', () => {

    let server;

    beforeEach(() => {

        server = new Hapi.Server();
        server.path(process.cwd() + '/test');

        server.route({
            method: 'get',
            path: '/error',
            handler: (request, reply) => {

                return reply(Boom.badImplementation());
            }
        });

        server.route({
            method: 'get',
            path: '/none',
            handler: (request, reply) => {

                return reply(Boom.notImplemented());
            }
        });
    });

    const register = async (options) => {
        // Load Plugins
        return await server.register([
            Inert,
            {
                plugin: Plugin,
                options: options
            }
        ]);
    };

    it('error if invalid options', () => {

        register({ test: 'value' })
            .catch((err) => {
                expect(err).to.exist();

            });
    });
});
