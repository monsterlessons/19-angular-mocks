var app = angular.module('app', ['ngMockE2E']);

app.run(function ($httpBackend) {
  var books = [
    {
      name: 'AngularJS'
    },
    {
      name: 'EmberJS'
    }
  ];

  $httpBackend.whenGET('http://localhost:3001/books').respond(200, books);

  $httpBackend.whenPOST('http://localhost:3001/books').respond(function (method, url, data) {
    var result = JSON.parse(data);
    books.push(result);
    return [200, result];
  });


});

app.controller('mainCtrl', function ($http, $scope) {
  $http.get('http://localhost:3001/books')
    .success(function (result) {
      console.log('sucess', result);
      $scope.books = result;
    })
    .error(function (result) {
      console.log('error');
    });

  $scope.addBook = function (book) {
    console.log(book);
    $http.post('http://localhost:3001/books', book)
      .success(function (result) {
        console.log('Book successfully saved to backend');
        $scope.books.push(book);
        $scope.book = null;
      })
      .error(function (result) {
        console.log('Error in book post');
      });
  };
});
