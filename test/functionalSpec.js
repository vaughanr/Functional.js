describe('pipes', function(){
    describe('map', function(){
        it('should map a function on each item of an array', function(){
            var pipe = new fnc.Pipe([1,2,3]);

            var expected = [2,4,6];

            var actual = pipe.map(function(item){return 2 * item;}).result();

            expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
        });

        it('should apply 2 maps after each other', function(){
            var pipe = new fnc.Pipe([10,20,30]);

            //each -1 then * 2
            var expected = [18,38,58];

            var actual = pipe.map(function(item){return item - 1;})
                                .map(function(item){return 2 * item;})
                                .result();

            expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
        });

        it('should apply map to complex object', function(){
            var pipe = new fnc.Pipe({one:1,two:2, three:3});

            var expected = [2,4,6];

            var actual = pipe.map(function(num, key){return 2 * num;}).result();

            expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
        });
    });

    describe('map', function(){
        it('pluck the a property from an array', function(){
            var stooges = [{name : 'moe', age : 40}, {name : 'larry', age : 50}, {name : 'curly', age : 60}];
            var pipe = new fnc.Pipe(stooges);
            var expected = [40,50,60];

            var actual = pipe.pluck('age').result();

            expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
        });
    });
    describe('reduce', function(){
        it('should reduce an array to a single item', function(){
            var pipe = new fnc.Pipe([1,2,3]);

            var expected = 6;

            var actual = pipe.reduce(function(first, second){return first + second;}).result();

            expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
        });

        it('should reduce after a map on an array', function(){
            var pipe = new fnc.Pipe([1,2,3]);

            var expected = 12;

            var actual = pipe.map(function(item){return 2 * item;})
                .reduce(function(first, second){return first + second;})
                .result();

            expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
        });

        it('should reduce a complex object', function(){
            var pipe = new fnc.Pipe({one:1,two:2, three:3});

            var expected = 6;

            var actual = pipe.reduce(function(first, second){return first + second;})
                        .result();

            expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
        });
    });
});

