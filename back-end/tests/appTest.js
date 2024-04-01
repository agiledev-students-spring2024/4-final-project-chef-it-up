const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);

const assert = require('assert');
const expect = chai.expect;

// without these tests running, % line coverage is 45.51. After adding these tests, we get a 57.18 % line coverage -Ryan
// Kei test went from 57.18-74.17

describe('get request to get all users recipes', () => {
  it('should return all users recipes', (done) => {
    chai
      .request(app)
      .get('/api/myRecipes')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});

describe('get request to get all favorite recipes', () => {
  it('should return all favorite recipes', (done) => {
    chai
      .request(app)
      .get('/api/favoriteRecipes')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});

describe('get request to get all recipes', () => {
  it('should return all recipes', (done) => {
    chai
      .request(app)
      .get('/api/browseRecipes')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});

describe('Get request for a individual recipe info', () => {
  it('should return info a recipe with a valid id', (done) => {
    chai
      .request(app)
      .get('/api/individualRecipeInfo/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id', 1);
        done();
      });
  });

  it('should return a 404 when invalid id is given', (done) => {
    chai
      .request(app)
      .get('/api/individualRecipeInfo/100')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Get request for your individual recipe info', () => {
  it('should return info of your recipe with a valid id', (done) => {
    chai
      .request(app)
      .get('/api/myIndividualRecipe/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id', 1);
        done();
      });
  });

  it('should return a 404 when invalid id is given', (done) => {
    chai
      .request(app)
      .get('/api/myIndividualRecipe/100')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Get request for favorite individual recipe info', () => {
  it('should return info of one of your favorite recipes with a valid id', (done) => {
    chai
      .request(app)
      .get('/api/individualFavoriteInfo/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id', 1);
        done();
      });
  });

  it('should return a 404 when invalid id is given', (done) => {
    chai
      .request(app)
      .get('/api/individualFavoriteInfo/100')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('request to remove one of your recipes from your favorite list', () => {
  it('should successfully remove recipe from favorite list', (done) => {
    chai
      .request(app)
      .delete('/api/Unfavorite/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should unsuccessfully remove recipe from favorite list', (done) => {
    chai
      .request(app)
      .delete('/api/Unfavorite/100')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

describe('POST request to delete one of your own recipes', () => {
  it('should successfully remove recipe from your recipes list', (done) => {
    chai
      .request(app)
      .delete('/api/deleteRecipe/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should unsuccessfully remove recipe from favorite list', (done) => {
    chai
      .request(app)
      .delete('/api/deleteRecipe/100')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

describe('Get request to filter recipe by difficulty level ', () => {
  it('should return a list of recipe that are filtered by difficulty with a number indicating which page', (done) => {
    chai
      .request(app)
      .get('/api/filterRecipes/difficulty/Easy/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Get request to filter recipe by meal type level ', () => {
  it('should return a list of recipe that are filtered by meal type with a number indicating which page', (done) => {
    chai
      .request(app)
      .get('/api/filterRecipes/mealtypes/dinner/3')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Get request to filter recipe by cuisine type', () => {
  it('should return a list of recipe that are filtered by cuisine with a number indicating which page', (done) => {
    chai
      .request(app)
      .get('/api/filterRecipes/cuisine/Mexican/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Post request to login api', () => {
  it('should login successfully and return the user info with correct condentials', (done) => {
    chai
      .request(app)
      .post('/api/login')
      .send({ username: 'First Last', password: 'Password' })
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.status, 200);
        assert.equal(res.body.username, 'First Last');
        done();
      });
  });

  it('should return 401 for invalid username', (done) => {
    chai
      .request(app)
      .post('/api/login')
      .send({ username: 'InvalidUser', password: 'Password' })
      .end((err, res) => {
        assert.equal(res.status, 401);
        assert.equal(res.text, 'Invalid username');
        done();
      });
  });

  it('should return 401 for invalid password', (done) => {
    chai
      .request(app)
      .post('/api/login')
      .send({ username: 'First Last', password: 'InvalidPassword' })
      .end((err, res) => {
        assert.equal(res.status, 401);
        assert.equal(res.text, 'Invalid password');
        done();
      });
  });
});

describe('POST request to api register', () => {
  it('should register a new user successfully', (done) => {
    chai
      .request(app)
      .post('/api/register')
      .send({ username: 'user', password: 'pass', starter: 'none' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body, 'Successfully registered');
        done();
      });
  });
  it('should return 400 for missing username', (done) => {
    chai
      .request(app)
      .post('/api/register')
      .send({ password: 'pass', starter: 'none' })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(res.text, 'Please provide a username, password, and default fridge.');
        done();
      });
  });
  it('should return 400 for missing password', (done) => {
    chai
      .request(app)
      .post('/api/register')
      .send({ username: 'user', starter: 'none' })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(res.text, 'Please provide a username, password, and default fridge.');
        done();
      });
  });
});

describe('POST request to api edit the profile of currently logged in user', () => {
  it('edit the user profile successfully', (done) => {
    chai
      .request(app)
      .post('/api/editMyProfile')
      .send({ username: 'new', password: 'passnew', userid: 1 })
      .end((err, res) => {
        assert.equal(res.status, 200);
        expect(res.body).to.have.property('id', 1);
        expect(res.body).to.have.property('username', 'new');
        expect(res.body).to.have.property('password', 'passnew');
        done();
      });
  });
  it('return 400 for missing username', (done) => {
    chai
      .request(app)
      .post('/api/editMyProfile')
      .send({ password: 'passnew', userid: 1 })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(res.text, 'Please provide a username, password, and be logged in.');
        done();
      });
  });
  it('return 400 for missing password', (done) => {
    chai
      .request(app)
      .post('/api/editMyProfile')
      .send({ username: 'new', userid: 1 })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(res.text, 'Please provide a username, password, and be logged in.');
        done();
      });
  });
  it('return 403 for non-existent user', (done) => {
    chai
      .request(app)
      .post('/api/editMyProfile')
      .send({ username: 'new', password: 'passnew', userid: 1000 })
      .end((err, res) => {
        assert.equal(res.status, 403);
        assert.equal(res.text, 'No such user exists');
        done();
      });
  });
});

describe('POST request to api add a recipe', () => {
  it('add a recipe successfully', (done) => {
    const newRecipeData = {
      recipeName: 'Recipe',
      image: 'image.jpg',
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      instructions: 'Cook the recipe',
      prepTime: '3',
      cookTime: '4',
      totalTime: '7',
      cuisine: 'French',
      difficultyLevel: 'Intermediate',
      mealType: 'Dinner',
    };

    chai
      .request(app)
      .post('/api/addRecipe')
      .send(newRecipeData)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body, 'Successfully added new recipe');
        done();
      });
  });
});

describe('GET request to get all ingredients in fridge', () => {
  it('should return all ingredients in fridge', (done) => {
    chai
      .request(app)
      .get('/api/myFridge')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});

describe('GET request for individual ingredient', () => {
  it('should return details of ingredient with valid id', (done) => {
    chai
      .request(app)
      .get('/api/myFridge/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id', 1);
        done();
      });
  });
  it('should return status 404 if ingredient has invalid id', (done) => {
    chai
      .request(app)
      .get('/api/myFridge/100')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('POST request for adding an ingredient to fridge', () => {
  it('should sucessfully add an ingredient', (done) => {
    const newIngredientData = {
      ingredient_name: 'Ingredient',
      img: 'image.png',
      expiry_date: '2020-02-20',
      quantity: '1',
    };

    chai
      .request(app)
      .post('/api/addIngredient')
      .send(newIngredientData)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body, 'successfully added ingredient to fridge');
        done();
      });
  });
});

describe('GET request for viewing an ingredient to edit', () => {
  it('should successfully return details of an ingredient with valid id', (done) => {
    chai
      .request(app)
      .get('/api/editIngredientInfo/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id', 1);
        done();
      });
    it('should return status 404 if ingredient has invalid id', (done) => {
      chai
        .request(app)
        .get('/api/editIngredientInfo/100')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});

describe('PUT request for editing an ingredient', () => {
  it('should successfully edit the details of an ingredient with valid id', (done) => {
    const newIngredientData = {
      ingredient_name: 'Ingredient',
      img: 'image.png',
      expiry_date: '2020-02-20',
      quantity: '1',
    };

    chai
      .request(app)
      .put('/api/editIngredient/1')
      .send(newIngredientData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        assert.equal(res.body.message, 'Ingredient updated successfully');
        done();
      });
  });

  it('should return status 404 when trying to edit an invalid ingredient', (done) => {
    const newIngredientData = {
      ingredient_name: 'Ingredient',
      img: 'image.png',
      expiry_date: '2020-02-20',
      quantity: '1',
    };

    chai
      .request(app)
      .put('/api/editIngredient/100')
      .send(newIngredientData)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        assert.equal(res.body.error, 'Ingredient not found');
        done();
      });
  });
});

describe('DELETE request for removing an ingredient from the fridge', () => {
  it('should remove an ingredient with valid id from fridge', (done) => {
    chai
      .request(app)
      .delete('/api/deleteIngredient/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        assert.equal(res.body.message, 'Ingredient removed from fridge');
        done();
      });
  });
  it('should return status 404 when trying to remove an invalid ingredient', (done) => {
    chai
      .request(app)
      .delete('/api/deleteIngredient/100')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        assert.equal(res.body.error, 'Ingredient not found in fridge');
        done();
      });
  });
});
