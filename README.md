# GTL - Global Todo List

A todo list application with a single global todo. Rendered universally with
React, updated with Redux through an Expressjs API and persisted in PostgreSQL.  

## Requirements

 * Probably OS X/Linux
 * Git (≥ v2.8)
 * Docker (≥ v1.11)
 * Docker Compose
 * NVM (to install Nodejs) installed in `$NVM_DIR` (which it will be by default).

### Installing the Requirements on OS X

 * NVM: `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash`
 * Docker
  * Preferred: Install the [beta version](https://beta.docker.com)
  * Use something like [dlite](https://github.com/nlf/dlite) and install Docker from `brew`
  * Use the [official, old, Docker version](https://docs.docker.com/mac/step_one/)

## Usage

Perform initial setup: `./devenv create`. This will set up the docker network,
images and containers and install the Node dependencies locally (so i.e.
in-editor linting works).

Run the development server: `./devenv start`. This will start the docker
containers and `npm run dev` inside. You can view the result at
`http://<docker-ip>:3000`.

If you need to install new NPM packages, run `./devenv update` in a new
terminal after `package.json` has been updated. This is required because the
`node_modules` is installed on a separate Docker volume.

If you need to rebuild the images (i.e. to change node version), use './devenv rebuild'

**NOTE:** Ensure that the version of node specified in `.nvmrc` matches what is specified in the `Dockerfile` files.
