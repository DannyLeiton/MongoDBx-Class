var mongodb = require('mongodb');
var uri = 'mongodb://localhost:27017/example';
mongodb.MongoClient.connect(uri, function(error, db) {
    if (error) {
        console.log(error);
        process.exit(1);
    }

    var doc = {
        title: 'Jaws',
        year: '1975',
        director: 'Steven Spielberg',
        rating: 'PG'
    };

    var doc = {
        title: 'Saw',
        year: '2005',
        director: 'Tarantino',
        rating: 'PG',
        ratings : { //Nested JSON.
            critics: 80,
            audience: 98
        },
        screenplay: ['Peter Benchley', 'Carl Gotlieb'] //Array field
    };

    db.collection('movies').insert(doc, function(error, result) {
        if (error) {
            console.log(error);
            process.exit(1);
        }
        var query = { year: '1975' }; 
        var queryAnd = { year: '1975', rating: 'PG' }; //This will be treated as an AND.
        var queryArrayField = { screenplay: 'Peter Benchley' };
        var queryNested = { 'ratings.audience': { '$gte': 90 } };
        db.collection('movies').find(queryNested).toArray(function(error, docs) {
            if (error) {
                console.log(error);
                process.exit(1);
            }

            console.log('Found movies:');
            console.log(docs);
           // docs.forEach(function(doc) {
                //console.log(JSON.stringify(doc));
           // });

            process.exit(0);
        });
    });
});