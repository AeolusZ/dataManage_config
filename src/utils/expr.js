// function fn(){
//     var privateScope = new WeakMap();
//     var counter = 0;
//     var Thing = function() {
//         this.someProperty = 'foo';
        
//         privateScope.set(this, {
//           hidden: ++counter,
//         });
//     };
//     Thing.prototype.showPublic = function() {
//         console.log(this.someProperty)
//         return this.someProperty;
//     };
    
//     Thing.prototype.showPrivate = function() {
//         console.log(privateScope.get(this).hidden)
//         return privateScope.get(this).hidden;
//     };
//     return Thing
// }

// console.log(typeof privateScope);
// var Fn = fn()
// var thing = new Fn();

// console.log(thing);

// thing.showPublic();

// thing.showPrivate();
