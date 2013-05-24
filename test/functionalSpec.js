describe('pipes', function(){

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



