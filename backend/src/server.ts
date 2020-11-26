import app from './app';
import databese from './database';

databese.sync();
console.log('database running 3306');

app.listen(3001);
console.log('server running att 300');