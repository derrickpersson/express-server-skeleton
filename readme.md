# Express Server Skeleton

This repo is built as a starter template for your project.

The goal was to have a starting point that includes user authentication / accounts already set up as well as some of the basic things an app needs (like health check, info endpoint & logging).

Feel free to modify this project to your needs.

## Getting started

You'll need to set up you're own DB before running this project, it was initially set up using postgreql but by using Knex you can easily set up any other SQL DB Knex supports.

```bash
git clone git@github.com:derrickpersson/express-server-skeleton.git
cd express-server-skeleton
cp .env.example .env  ## Fill in the .env file with your specific configurations
npm i
npm run db migrate:latest  ## Requires DB be set up
npm run watch
```

## Feedback? Comments? Issues?

Please open an issue on Github and I'll get back to you.

While I am planning on maintaining this repo - the following still applies:

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
