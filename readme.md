## Node version
- node version: v16.10.x

## Run the project
```
- yarn
- yarn dev
- http://localhost:3000/
```

## Feedback for the api
- The API response lack for debugging. The response should contains `request_id`, `request_dateTime`, `request_statusCode`, `request_message`
- API `fee-assessment-books` should support for get all category. When we're not set `categoryId` params, the api should retrieved all the book from all category. 
- API `fee-assessment-books` should support for sorting, e.g: ascending, descending, most viewed, best seller, current trend, recommendation, etc.
- API `fee-assessment-books` should support for multiple filter. e.g: `categoryId=1,11,12`
- API `fee-assessment-books` should support for search and its pagination, so the user can only search what they've retrieved at that time.
- API `fee-assessment-books` should support for detail books by booksId
- All content-type of the response API should be `application/json`