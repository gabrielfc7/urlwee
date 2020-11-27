import app from './app';
import database from './database';

// database.sync({force: true}); // Com force true ele sempre recria o banco
database.sync();
console.log('Database running at 3306');


app.listen(3002);
console.log('Server running at 3002');