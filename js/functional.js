var fnc = function(){
    var each = function(that, collection, func){
        if((Array.isArray && Array.isArray(collection)) || collection instanceof Array){
            for(var i = 0, len = collection.length;i<len; i++){
                func.call(that,collection[i],i, len);
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

    var reduceCollection = function(that,collection, reduceFunc){
        var accumVal = 0;
        each(that,collection,function(item){
            accumVal = reduceFunc(accumVal,item);
        });
        return accumVal;
    };

    var Pipe = function(array){
        this.collection = array;
        this.transforms = [];
    }
    Pipe.prototype.map = function(mapFunc){
        this.transforms.push(mapFunc);
        return this;
    };

    Pipe.prototype.pluck = function(propName){
        var pluckFunc = function(item){
            for(var prop in item){
                if(item.hasOwnProperty(prop)){
                    if(prop === propName){
                        return item[prop];
                    }
                }
            }
            return item;
        };

        this.transforms.push(pluckFunc);
        return this;
    };

    Pipe.prototype.reduce = function(reduceFunc){
        this.reduceFnc = reduceFunc;
        return this;
    };

    Pipe.prototype.result = function(){
        var result = [];

        var clonedtransforms = this.transforms.concat([]);

        each(this,this.collection,function(current){
            if(typeof current !== 'undefined'){
                each(this,clonedtransforms,function(currentTransform){
                    if(typeof currentTransform !== 'undefined'){
                            current = currentTransform(current);
                    }
                });
                result.push(current);
            }
        })

        if(this.reduceFnc){
            return reduceCollection(this,result,this.reduceFnc);
        }

        return result;
    };

    return {
        Pipe:Pipe
    }
}();