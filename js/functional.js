var fnc = function(){
    var each = function(that, collection, func){
        if((Array.isArray && Array.isArray(collection)) || collection instanceof Array){
            for(var i = 0, len = collection.length;i<len; i++){
                func.call(that,collection[i],i);
            };
        }else {
            var i = 0;
            for(var prop in collection){
                if(collection.hasOwnProperty(prop)){
                    func.call(that,collection[prop],i++);
                }
            }
        }
    }

    var Pipe = function(array){
        this.collection = array;
        this.transforms = [];
    }
    Pipe.prototype.map = function(mapFunc){
        this.transforms.push(mapFunc);
        return this;
    };

    Pipe.prototype.result = function(){
        var result = [];
        each(this,this.collection,function(current){
            if(typeof current !== 'undefined'){
                each(this,this.transforms,function(currentTransform){
                    if(typeof currentTransform !== 'undefined'){
                        console.info('before');
                        console.info(current);
                        current = currentTransform(current);
                        console.info('after');
                        console.info(current);
                    }
                });
                result.push(current);
            }
        })

        return result;
    };

    return {
        Pipe:Pipe
    }
}();