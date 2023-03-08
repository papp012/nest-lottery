const {MongoClient} = require('mongodb');


describe('insert', ()=> {

    let connection;
    let db;

    beforeAll(async() => { 
        connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
          db = await connection.db(globalThis.__MONGO_DB_NAME__);
    });

    afterAll(async () => {
        await connection.close();
    });
        
    it('should insert a doc into collection', async () => {
        const numbers = db.collection('winningNumbers');
    
        const mockWinningNumbers = { _id: 'some-user-id',"winning numbers": [1,2,3,4,5]};
        await numbers.insertOne(mockWinningNumbers);
    
        const insertedNumbers = await numbers.findOne({ _id: 'some-user-id' });
        expect(insertedNumbers).toEqual(mockWinningNumbers);
    });
})