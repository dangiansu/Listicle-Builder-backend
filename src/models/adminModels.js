import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  FirstName: 
  { 
    type: String, 
    required: true 
  },
  LastName: 
  { 
    type: String, 
    required: true 
  }
  ,
  Email: 
  { 
    type: String,
    required: true, 
    unique: true, 
    match: /.+\@.+\..+/ 
}
});

const Lead = mongoose.model('Lead', leadSchema);
export default Lead;
