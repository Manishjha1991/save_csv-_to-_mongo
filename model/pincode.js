var mongoose = require('mongoose');
var pincodeSchema = new mongoose.Schema({
  _id:{type:Number},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   area:String,
   pincode:{type:Number} ,
   country: String,
   state:String,
   city: String,
   dcity: String,
   subarea: String,
   mainarea: String,
   stdcode: String,
   display_flag: String,
   deleted:{type:Number},
   typeflag:{type:Number},
   updatedon: String,
   createdon: { type: Date, default: Date.now },
   latitude: {type:Number},
   longitude: {type:Number}
});



mongoose.model('doc_area_master', pincodeSchema);


