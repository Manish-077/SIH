const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ai_crop', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');
    try {
      const result = await mongoose.connection.db.collection('farmers').dropIndex('email_1');
      console.log('Dropped index:', result);
    } catch (err) {
      console.error('Error dropping index:', err.message);
    } finally {
      mongoose.connection.close();
    }
  })
  .catch(err => console.error('MongoDB connection error:', err));
