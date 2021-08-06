const express = require('express')
const serverless = require('serverless-http')
const cors = require('cors')
const bodyparser = require('body-parser')
const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid')

var dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' });

var jsonParser = bodyparser.json();
const app = express();
app.use(cors());

app.use(express.urlencoded({
    extended: true
  }))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.get("/entryForm", function (req, res) {
    res.sendFile(__dirname + "/entryForm.html")
})

app.get("/foodForm", function (req, res) {
    res.sendFile(__dirname + "/foodForm.html")
})
app.get("/movieForm", function (req, res) {
    res.sendFile(__dirname + "/movieForm.html")
})



//ENTRIES - ENTRIES - ENTRIES - ENTRIES - ENTRIES - ENTRIES - ENTRIES - ENTRIES - ENTRIES - ENTRIES - //////
//ENTRIES - ENTRIES - ENTRIES - ENTRIES - ENTRIES - ENTRIES - ENTRIES - ENTRIES - ENTRIES - ENTRIES - //////
//ENTRIES - ENTRIES - ENTRIES - ENTRIES - ENTRIES - ENTRIES - ENTRIES - ENTRIES - ENTRIES - ENTRIES - //////
//ENTRIES - ENTRIES - ENTRIES - ENTRIES - ENTRIES - ENTRIES - ENTRIES - ENTRIES - ENTRIES - ENTRIES - //////

app.post("/createEntry", jsonParser, function (req, res) {
    let id = uuidv4();
    let date = new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' });
    (async () => {
        try {
            let data = {
                "pk": "Entry",
                "sk": id,
                "title": req.body.title,
                "date": date,
                "entry": req.body.entry,
                "signature": req.body.signature,
            };

            var params = {
                Item: data,
                ReturnConsumedCapacity: "TOTAL",
                TableName: "entries"
            
            };

            dynamodb.put(params, function (err, response) {
                if (err) res.status(500).send(err);
                else {
                    res.redirect("/getAllEntries")
                }
            })
        } catch (error) {
            return res.status(500).send(error);
        }
    })()

 
})

app.get("/getAllEntries", function (req, res) {
    var params = {
        TableName: "entries"
    }

    dynamodb.scan(params, function (err, response) {
        if (err) res.status(500).send(err)
        else {
            //res.status(200).send(response.Items)
            res.write(' <!doctype html>')
            res.write('<html lang="en">')
            res.write('<head>')
            res.write('  <meta charset="utf-8">')
            res.write(' <meta name="viewport" content="width=device-width, initial-scale=1">')
            res.write(' <meta name="description" content="">')
            res.write('  <title>My diary app</title>')

            res.write('  <link rel="canonical" href="https://getbootstrap.com/docs/5.0/examples/album/">')
            res.write('<!-- Bootstrap core CSS -->')
            res.write(' <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">')

            res.write(' <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">')

            res.write(' <style>')
            res.write('  .bd-placeholder-img {')
                res.write('    font-size: 1.125rem;')
                res.write('    text-anchor: middle;')
                res.write('    -webkit-user-select: none;')
                res.write('    -moz-user-select: none;')
                res.write('    user-select: none;')
                res.write('  }')
                res.write(' #outer')
                res.write(' {')
                    res.write('     width:100%;')
                    res.write('     text-align: center;')
                    res.write(' }')
                    res.write(' .inner')
                    res.write(' {')
                        res.write('     display: inline-block;')
                        res.write(' }')


                res.write('  @media (min-width: 768px) {')
                    res.write('    .bd-placeholder-img-lg {')
                        res.write('     font-size: 3.5rem;')
                        res.write('   }')
                        res.write(' }')
                        res.write('</style>')

                        res.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>')

    
                        res.write('</head>')
                        res.write(' <body>')
    
                        res.write('<header>')
  
                        res.write(' <div class="navbar navbar-dark bg-dark shadow-sm">')
                        res.write('   <div class="container">')
                        res.write('     <a href="/" class="navbar-brand d-flex align-items-center">')
                        res.write('      <strong>My diary</strong>')
                        res.write('    </a>')
                        res.write('    <button class="navbar-toggler" type="button"  data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">')
                        res.write('      <span class="navbar-toggler-icon"></span>')
                        res.write('    </button>')
                        res.write('  </div>')
                        res.write(' </div>')
                        res.write('</header>')

                        res.write('<main class="container">')
                        res.write('<a role="button" type="button" href="/entryForm" class="btn btn-primary mt-3 mb-3">Add <i class="fas fa-plus"></i></a>')
                        res.write('<h2 class="text-center mb-3">Entries</h2>')
            res.write('    <table class="table">')
            res.write('<thead class="thead">')
            res.write('  <tr class="table-primary">')
            res.write('    <th scope="col">Fecha</th>')
            res.write('    <th scope="col">Titulo</th>')
            res.write('    <th scope="col">Entrada</th>')
            res.write('    <th scope="col">Firma</th>')
            res.write('    <th scope="col">Acciones</th>')
            res.write('  </tr>')
            res.write('</thead>')
            res.write('<tbody>')

           response.Items.forEach(item => {
            res.write('  <tr>')
            res.write('    <th scope="row">'+item.date+'</th>')
            res.write('   <td>'+item.title+'</td>')
            res.write('    <td>'+item.entry+'</td>')
            res.write('    <td>'+item.signature+'</td>')
            res.write('    <td><div id="outer"><a role="button" href="/getEntry/'+item.title+'"  class="btn btn-primary inner"><i class="fas fa-eye"></i></a> <a role="button"  href="/editEntry/'+item.title+'" class="btn btn-primary inner"><i class="fas fa-edit"></i></a>  <form action="/deleteEntry/'+item.sk+'" method="post" class="inner"><button type="submit" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button></form></div></td>')
            res.write('  </tr>')
           });

            res.write('</tbody>')
            res.write('</table>')
            res.write(' </div>')

            res.write('<footer class="text-muted py-5">')
            res.write(' <div class="container text-center">')
            res.write('   <hr>')
            res.write('   &copy; <span id="year"></span>')
            res.write(' </div>')
            res.write('</footer>')


            res.write('   <script src="/docs/5.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>')
            res.write('   <script>')
            res.write('     document.getElementById("year").innerHTML = new Date().getFullYear();')
            res.write(' </script>')
      
            res.write(' </body>')
            res.write('</html>')
            res.send()
        }
    })
})

app.get("/getEntry/:title", function (req, res) {
    (async () => {
        try {
            var params = {
                TableName: "entries",
                KeyConditionExpression: "pk = :pk",
                ExpressionAttributeValues: {
                    ":pk": "Entry",
                    ":title": req.params.title
                },
                ExpressionAttributeNames: {
                    "#title": "title"
                },
                FilterExpression: "#title = :title"
            };

            dynamodb.query(params, function (err, response) {
                if (err) res.status(500).send(err)
                else {
                    var selection = response.Items[0]
                    var title = selection['title']
                    var entry = selection['entry']
                    var signature = selection['signature']





                    res.write('<!doctype html>')
                    res.write('<html lang="en">')
                    res.write('  <head>')
                    res.write('    <meta charset="utf-8">')
                    res.write('    <meta name="viewport" content="width=device-width, initial-scale=1">')
                    res.write('    <meta name="description" content="">')
                    res.write('    <title>My diary app</title>')
                    res.write('    <link rel="canonical" href="https://getbootstrap.com/docs/5.0/examples/album/">')
                    
                    res.write('   <!-- Bootstrap core CSS -->')
                    res.write('    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">')
                    
                    res.write('    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">')
                    
                    res.write('                        <style>')
                    res.write('                          .bd-placeholder-img {')
                        res.write('                            font-size: 1.125rem;')
                        res.write('                            text-anchor: middle;')
                        res.write('-webkit-user-select: none;')
                        res.write('-moz-user-select: none;')
                        res.write('user-select: none;')
                        res.write('}')
                    
                        res.write('@media (min-width: 768px) {')
                            res.write('.bd-placeholder-img-lg {')
                                res.write('  font-size: 3.5rem;')
                                res.write('}')
                                res.write('}')
                                res.write(' </style>')
                    
                        
                                res.write(' </head>')
                                res.write('  <body>')
                        
                                res.write('  <header>')
                      
                                res.write('    <div class="navbar navbar-dark bg-dark shadow-sm">')
                                res.write('      <div class="container">')
                                res.write('        <a href="/" class="navbar-brand d-flex align-items-center">')
                                res.write('          <strong>My diary</strong>')
                                res.write('        </a>')
                                res.write('        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">')
                                res.write('          <span class="navbar-toggler-icon"></span>')
                                res.write('        </button>')
                                res.write('      </div>')
                                res.write('     </div>')
                                res.write('   </header>')
                    
                                res.write('<div class="container py-5">')
                                res.write('  <div class="row mb-4">')
                                res.write('    <div class="col-lg-8 mx-auto text-center">')
                                res.write('        <h1 class="display-6">View Form</h1>')
                                res.write('    </div>')
                                res.write('</div> <!-- End -->')
                                res.write('  <div class="row mt-4">')
                                res.write('      <div class="col-lg-6 mx-auto">')
                                res.write('          <div class="card ">')
                                res.write('              <div class="card-header">')
                     
                                res.write('                  <div class="tab-content">')
                    res.write('                      <div class="tab-pane fade show active pt-3">')
                    res.write('                          <form role="form" action="/createEntry" method="POST">')
                    res.write('                              <div class="form-group"> <label for="title">')
                    res.write('                                      <h6>Entry Name</h6>')
                    res.write('                                  </label> <input type="text" name="title" id="title"  value='+title+' readonly class="form-control "></div>')
                                                  
                    
                    res.write('                                  <div class="form-group"> <label for="entry">')
                    res.write('                                    <h6>Entry</h6>')
                    res.write('                                </label>')
                    
                    res.write('                               <textarea class="input-group" name="entry" id="entry" rows="10" cols="50" class="form-control " readonly>'+entry+'</textarea>')
                    res.write('                           </div>')
                                                  
                                                  
                                                  
                                                  
                                                  
                    res.write('                                <div class="form-group"> <label for="signature">')
                    res.write('                                    <h6>Signature</h6>')
                    res.write('                                 </label>')
                    res.write('                                 <div class="input-group"> <input type="text" id="signature" name="signature" value='+signature+' class="form-control " readonly>')
                                                          
                    res.write('                                 </div>')
                    res.write('                             </div>')
                          
                    res.write('                              <div class="card-footer"> <a role="button" type="button" href="/getAllEntries" class="subscribe btn btn-primary btn-block shadow-sm"> Go back </a>')
                    res.write('                          </form>')
                    res.write('                     </div>')
                    res.write('                  </div> <!-- End -->')
                        
                    res.write('                  <!-- End -->')
                    res.write('              </div>')
                    res.write('          </div>')
                    res.write('      </div>')
                    res.write('  </div>')
                    
                    res.write('<footer class="text-muted py-5">')
                    res.write('  <div class="container text-center">')
                    res.write('    <hr>')
                    res.write('    &copy; <span id="year"></span>')
                    res.write(' </div>')
                    res.write('</footer>')
                    
                    
                    res.write('    <script src="/docs/5.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>')
                    res.write('    <script>')
                    res.write('      document.getElementById("year").innerHTML = new Date().getFullYear();')
                    res.write('  </script>')
                          
                    res.write('  </body>')
                    res.write('</html>')
res.send()



                    
                }
            })
        } catch (err) {
            res.status(500).send(err)
        }
    })()
})


















//////////////////////////////////////////
app.get("/editEntry/:title", function (req, res) {
    (async () => {
        try {
            var params = {
                TableName: "entries",
                KeyConditionExpression: "pk = :pk",
                ExpressionAttributeValues: {
                    ":pk": "Entry",
                    ":title": req.params.title
                },
                ExpressionAttributeNames: {
                    "#title": "title"
                },
                FilterExpression: "#title = :title"
            };

            dynamodb.query(params, function (err, response) {
                if (err) res.status(500).send(err)
                else {
                    var selection = response.Items[0]
                    var title = selection['title']
                    var entry = selection['entry']
                    var signature = selection['signature']
                    var sk = selection['sk']





                    res.write('<!doctype html>')
                    res.write('<html lang="en">')
                    res.write('  <head>')
                    res.write('    <meta charset="utf-8">')
                    res.write('    <meta name="viewport" content="width=device-width, initial-scale=1">')
                    res.write('    <meta name="description" content="">')
                    res.write('    <title>My diary app</title>')
                    res.write('    <link rel="canonical" href="https://getbootstrap.com/docs/5.0/examples/album/">')
                    
                    res.write('   <!-- Bootstrap core CSS -->')
                    res.write('    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">')
                    
                    res.write('    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">')
                    
                    res.write('                        <style>')
                    res.write('                          .bd-placeholder-img {')
                        res.write('                            font-size: 1.125rem;')
                        res.write('                            text-anchor: middle;')
                        res.write('-webkit-user-select: none;')
                        res.write('-moz-user-select: none;')
                        res.write('user-select: none;')
                        res.write('}')
                    
                        res.write('@media (min-width: 768px) {')
                            res.write('.bd-placeholder-img-lg {')
                                res.write('  font-size: 3.5rem;')
                                res.write('}')
                                res.write('}')
                                res.write(' </style>')
                    
                        
                                res.write(' </head>')
                                res.write('  <body>')
                        
                                res.write('  <header>')
                      
                                res.write('    <div class="navbar navbar-dark bg-dark shadow-sm">')
                                res.write('      <div class="container">')
                                res.write('        <a href="/" class="navbar-brand d-flex align-items-center">')
                                res.write('          <strong>My diary</strong>')
                                res.write('        </a>')
                                res.write('        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">')
                                res.write('          <span class="navbar-toggler-icon"></span>')
                                res.write('        </button>')
                                res.write('      </div>')
                                res.write('     </div>')
                                res.write('   </header>')
                    
                                res.write('<div class="container py-5">')
                                res.write('  <div class="row mb-4">')
                                res.write('    <div class="col-lg-8 mx-auto text-center">')
                                res.write('        <h1 class="display-6">Edit Form</h1>')
                                res.write('    </div>')
                                res.write('</div> <!-- End -->')
                                res.write('  <div class="row mt-4">')
                                res.write('      <div class="col-lg-6 mx-auto">')
                                res.write('          <div class="card ">')
                                res.write('              <div class="card-header">')
                     
                                res.write('                  <div class="tab-content">')
                    res.write('                      <div class="tab-pane fade show active pt-3">')
                    res.write('                          <form role="form" action="/updateEntry/'+sk+'" method="POST">')
                    res.write('                              <div class="form-group"> <label for="title">')
                    res.write('                                      <h6>Entry Name</h6>')
                    res.write('                                  </label> <input type="text" name="title" id="title"  value='+title+' placeholder="Your Title Here..." class="form-control "></div>')
                                                  
                    
                    res.write('                                  <div class="form-group"> <label for="entry">')
                    res.write('                                    <h6>Entry</h6>')
                    res.write('                                </label>')
                    
                    res.write('                               <textarea class="input-group" name="entry" id="entry" rows="10" cols="50" placeholder="Your Entry Here..." class="form-control " >'+entry+'</textarea>')
                    res.write('                           </div>')
                                                  
                                                  
                                                  
                                                  
                                                  
                    res.write('                                <div class="form-group"> <label for="signature">')
                    res.write('                                    <h6>Signature</h6>')
                    res.write('                                 </label>')
                    res.write('                                 <div class="input-group"> <input type="text" id="signature" placeholder="Your Signature Here..." name="signature" value='+signature+' class="form-control " >')
                                                          
                    res.write('                                 </div>')
                    res.write('                             </div>')
                          
                    res.write('                              <div class="card-footer"> <button type="submit" value = "submit" class="subscribe btn btn-primary btn-block shadow-sm"> Update :) </button>')
                    res.write('                          </form>')
                    res.write('                     </div>')
                    res.write('                  </div> <!-- End -->')
                        
                    res.write('                  <!-- End -->')
                    res.write('              </div>')
                    res.write('          </div>')
                    res.write('      </div>')
                    res.write('  </div>')
                    
                    res.write('<footer class="text-muted py-5">')
                    res.write('  <div class="container text-center">')
                    res.write('    <hr>')
                    res.write('    &copy; <span id="year"></span>')
                    res.write(' </div>')
                    res.write('</footer>')
                    
                    
                    res.write('    <script src="/docs/5.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>')
                    res.write('    <script>')
                    res.write('      document.getElementById("year").innerHTML = new Date().getFullYear();')
                    res.write('  </script>')
                          
                    res.write('  </body>')
                    res.write('</html>')
res.send()







                    
                }
            })
        } catch (err) {
            res.status(500).send(err)
        }
    })()
})



/////////////////////////


































app.post("/updateEntry/:sk", jsonParser, function (req, res) {
    var params = {
        TableName: "entries",
        Key: {
            "pk": "Entry",
            "sk": req.params.sk
        },
        UpdateExpression: "set title = :t, entry = :l, signature = :e",
        ExpressionAttributeValues: {
            ":t": req.body.title,
            ":l": req.body.entry,
            ":e": req.body.signature
        },
        ReturValues: "UPDATED_NEW"
    };

    dynamodb.update(params, function (err, response) {
        if (err) res.status(500).send(err)
        else {
            res.redirect("/getAllEntries")
        }
    })
})



app.post("/deleteEntry/:sk", function(req, res){
    var params = {
        TableName: "entries",
        Key: {
            "pk": "Entry",
            "sk": req.params.sk
        }
    };

    dynamodb.delete(params, function(err, response){
        if (err) res.status(500).send(err)
        else {
            res.redirect("/getAllEntries")
        }
    })
})

//FOOD - FOOD - FOOD - FOOD - FOOD - FOOD - FOOD - FOOD - FOOD - FOOD - //////
//FOOD - FOOD - FOOD - FOOD - FOOD - FOOD - FOOD - FOOD - FOOD - FOOD - //////
//FOOD - FOOD - FOOD - FOOD - FOOD - FOOD - FOOD - FOOD - FOOD - FOOD - //////
//FOOD - FOOD - FOOD - FOOD - FOOD - FOOD - FOOD - FOOD - FOOD - FOOD - //////
//FOOD - FOOD - FOOD - FOOD - FOOD - FOOD - FOOD - FOOD - FOOD - FOOD - //////


app.post("/createRestaurant", jsonParser, function (req, res) {
    let id = uuidv4();
    let date = new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' });

    (async () => {
        try {
            let data = {
                "pk": "Restaurant",
                "sk": id,
                "nameR": req.body.nameR,
                "address": req.body.address,
                "phone": req.body.phone,
                "createdAt": date,
            };

            var params = {
                Item: data,
                ReturnConsumedCapacity: "TOTAL",
                TableName: "foods"
            };

            dynamodb.put(params, function (err, response) {
                if (err) res.status(500).send(err);
                else {
                    res.redirect("/getAllRestaurants")
                }
            })
        } catch (error) {
            return res.status(500).send(error);
        }
    })()

 
})

app.get("/getAllRestaurants", function (req, res) {
    var params = {
        TableName: "foods"
    }

    dynamodb.scan(params, function (err, response) {
        if (err) res.status(500).send(err)
        else {
       //     res.status(200).send(response.Items)
       res.write(' <!doctype html>')
       res.write('<html lang="en">')
       res.write('<head>')
       res.write('  <meta charset="utf-8">')
       res.write(' <meta name="viewport" content="width=device-width, initial-scale=1">')
       res.write(' <meta name="description" content="">')
       res.write('  <title>My diary app</title>')

       res.write('  <link rel="canonical" href="https://getbootstrap.com/docs/5.0/examples/album/">')
       res.write('<!-- Bootstrap core CSS -->')
       res.write(' <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">')

       res.write(' <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">')

       res.write(' <style>')
       res.write('  .bd-placeholder-img {')
           res.write('    font-size: 1.125rem;')
           res.write('    text-anchor: middle;')
           res.write('    -webkit-user-select: none;')
           res.write('    -moz-user-select: none;')
           res.write('    user-select: none;')
           res.write('  }')

           res.write('  @media (min-width: 768px) {')
               res.write('    .bd-placeholder-img-lg {')
                   res.write('     font-size: 3.5rem;')
                   res.write('   }')
                   res.write(' }')


                   res.write(' #outer')
                   res.write(' {')
                       res.write('     width:100%;')
                       res.write(' }')
                       res.write(' .inner')
                       res.write(' {')
                           res.write('     display: inline-block;')
                           res.write(' }')

                   res.write('</style>')


                   res.write('</head>')
                   res.write(' <body>')

                   res.write('<header>')

                   res.write(' <div class="navbar navbar-dark bg-dark shadow-sm">')
                   res.write('   <div class="container">')
                   res.write('     <a href="/" class="navbar-brand d-flex align-items-center">')
                   res.write('      <strong>My diary</strong>')
                   res.write('    </a>')
                   res.write('    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">')
                   res.write('      <span class="navbar-toggler-icon"></span>')
                   res.write('    </button>')
                   res.write('  </div>')
                   res.write(' </div>')
                   res.write('</header>')

                   res.write('<main class="container">')
                   res.write('<a role="button" type="button" href="/foodForm" class="btn btn-secondary mt-3 mb-3">Add <i class="fas fa-plus"></i></a>')
                   res.write('<h2 class="text-center mb-3">Restaurants</h2>')
       res.write('    <table class="table">')
       res.write('<thead class="thead">')
       res.write('  <tr class="table-secondary">')
       res.write('    <th scope="col">Fecha de creación</th>')
       res.write('    <th scope="col">Nombre</th>')
       res.write('    <th scope="col">Dirección</th>')
       res.write('    <th scope="col">Teléfono</th>')
       res.write('    <th scope="col">Acciones</th>')
       res.write('  </tr>')
       res.write('</thead>')
       res.write('<tbody>')

      response.Items.forEach(item => {
       res.write('  <tr>')
       res.write('    <th scope="row">'+item.createdAt+'</th>')
       res.write('   <td>'+item.nameR+'</td>')
       res.write('    <td>'+item.address+'</td>')
       res.write('    <td>'+item.phone+'</td>')
       res.write('    <td><div id="outer"><a role="button" href="/getRestaurant/'+item.nameR+'"  class="btn btn-secondary inner"><i class="fas fa-eye"></i></a> <a role="button"  href="/editRestaurant/'+item.nameR+'" class="btn btn-secondary inner"><i class="fas fa-edit"></i></a>  <form action="/deleteRestaurant/'+item.sk+'" method="post" class="inner"><button type="submit" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button></form></div></td>')
             res.write('  </tr>')
      });

       res.write('</tbody>')
       res.write('</table>')
       res.write(' </div>')

       res.write('<footer class="text-muted py-5">')
       res.write(' <div class="container text-center">')
       res.write('   <hr>')
       res.write('   &copy; <span id="year"></span>')
       res.write(' </div>')
       res.write('</footer>')


       res.write('   <script src="/docs/5.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>')
       res.write('   <script>')
       res.write('     document.getElementById("year").innerHTML = new Date().getFullYear();')
       res.write(' </script>')
 
       res.write(' </body>')
       res.write('</html>')
       res.send()
        }
    })
})

app.get("/getRestaurant/:nameR", function (req, res) {
    (async () => {
        try {
            var params = {
                TableName: "foods",
                KeyConditionExpression: "pk = :pk",
                ExpressionAttributeValues: {
                    ":pk": "Restaurant",
                    ":nameR": req.params.nameR
                },
                ExpressionAttributeNames: {
                    "#nameR": "nameR"
                },
                FilterExpression: "#nameR = :nameR"
            };

            dynamodb.query(params, function (err, response) {
                if (err) res.status(500).send(err)
                else {
                    var selection = response.Items[0]
                    var nameR = selection['nameR']
                    var address = selection['address']
                    var phone = selection['phone']





                    res.write('<!doctype html>')
                    res.write('<html lang="en">')
                    res.write('  <head>')
                    res.write('    <meta charset="utf-8">')
                    res.write('    <meta name="viewport" content="width=device-width, initial-scale=1">')
                    res.write('    <meta name="description" content="">')
                    res.write('    <title>My diary app</title>')
                    res.write('    <link rel="canonical" href="https://getbootstrap.com/docs/5.0/examples/album/">')
                    
                    res.write('   <!-- Bootstrap core CSS -->')
                    res.write('    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">')
                    
                    res.write('    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">')
                    
                    res.write('                        <style>')
                    res.write('                          .bd-placeholder-img {')
                        res.write('                            font-size: 1.125rem;')
                        res.write('                            text-anchor: middle;')
                        res.write('-webkit-user-select: none;')
                        res.write('-moz-user-select: none;')
                        res.write('user-select: none;')
                        res.write('}')
                    
                        res.write('@media (min-width: 768px) {')
                            res.write('.bd-placeholder-img-lg {')
                                res.write('  font-size: 3.5rem;')
                                res.write('}')
                                res.write('}')
                                res.write(' </style>')
                    
                        
                                res.write(' </head>')
                                res.write('  <body>')
                        
                                res.write('  <header>')
                      
                                res.write('    <div class="navbar navbar-dark bg-dark shadow-sm">')
                                res.write('      <div class="container">')
                                res.write('        <a href="/" class="navbar-brand d-flex align-items-center">')
                                res.write('          <strong>My diary</strong>')
                                res.write('        </a>')
                                res.write('        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">')
                                res.write('          <span class="navbar-toggler-icon"></span>')
                                res.write('        </button>')
                                res.write('      </div>')
                                res.write('     </div>')
                                res.write('   </header>')
                    
                                res.write('<div class="container py-5">')
                                res.write('  <div class="row mb-4">')
                                res.write('    <div class="col-lg-8 mx-auto text-center">')
                                res.write('        <h1 class="display-6">View Form</h1>')
                                res.write('    </div>')
                                res.write('</div> <!-- End -->')
                                res.write('  <div class="row mt-4">')
                                res.write('      <div class="col-lg-6 mx-auto">')
                                res.write('          <div class="card ">')
                                res.write('              <div class="card-header">')
                     
                                res.write('                  <div class="tab-content">')
                    res.write('                      <div class="tab-pane fade show active pt-3">')
                    res.write('                          <form role="form" action="/createEntry" method="POST">')
                    res.write('                              <div class="form-group"> <label for="title">')
                    res.write('                                      <h6>Entry Name</h6>')
                    res.write('                                  </label> <input type="text" name="title" id="title"  value='+nameR+' readonly class="form-control "></div>')
                                                  
                    
                    res.write('                                  <div class="form-group"> <label for="entry">')
                    res.write('                                    <h6>Entry</h6>')
                    res.write('                                </label>')
                    
                    res.write('                               <textarea class="input-group" name="entry" id="entry" rows="10" cols="50" class="form-control " readonly>'+address+'</textarea>')
                    res.write('                           </div>')
                                                  
                                                  
                                                  
                                                  
                                                  
                    res.write('                                <div class="form-group"> <label for="signature">')
                    res.write('                                    <h6>Signature</h6>')
                    res.write('                                 </label>')
                    res.write('                                 <div class="input-group"> <input type="text" id="signature" name="signature" value='+phone+' class="form-control " readonly>')
                                                          
                    res.write('                                 </div>')
                    res.write('                             </div>')
                          
                    res.write('                              <div class="card-footer"> <a role="button" type="button" href="/getAllRestaurants" class="subscribe btn btn-secondary btn-block shadow-sm"> Go back </a>')
                    res.write('                          </form>')
                    res.write('                     </div>')
                    res.write('                  </div> <!-- End -->')
                        
                    res.write('                  <!-- End -->')
                    res.write('              </div>')
                    res.write('          </div>')
                    res.write('      </div>')
                    res.write('  </div>')
                    
                    res.write('<footer class="text-muted py-5">')
                    res.write('  <div class="container text-center">')
                    res.write('    <hr>')
                    res.write('    &copy; <span id="year"></span>')
                    res.write(' </div>')
                    res.write('</footer>')
                    
                    
                    res.write('    <script src="/docs/5.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>')
                    res.write('    <script>')
                    res.write('      document.getElementById("year").innerHTML = new Date().getFullYear();')
                    res.write('  </script>')
                          
                    res.write('  </body>')
                    res.write('</html>')
res.send()
                }
            })
        } catch (err) {
            res.status(500).send(err)
        }
    })()
})








///////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////
app.get("/editRestaurant/:nameR", function (req, res) {
    (async () => {
        try {
            var params = {
                TableName: "foods",
                KeyConditionExpression: "pk = :pk",
                ExpressionAttributeValues: {
                    ":pk": "Restaurant",
                    ":nameR": req.params.nameR
                },
                ExpressionAttributeNames: {
                    "#nameR": "nameR"
                },
                FilterExpression: "#nameR = :nameR"
            };

            dynamodb.query(params, function (err, response) {
                if (err) res.status(500).send(err)
                else {
                    var selection = response.Items[0]
                    var nameR = selection['nameR']
                    var address = selection['address']
                    var phone = selection['phone']
                    var sk = selection['sk']



                    res.write('<!doctype html>')
                    res.write(' <html lang="en">')
                    res.write(' <head>')
                    res.write('   <meta charset="utf-8">')
                    res.write('   <meta name="viewport" content="width=device-width, initial-scale=1">')
                    res.write('   <meta name="description" content="">')
                    res.write('  <title>My diary app</title>')
                  
                    res.write('  <link rel="canonical" href="https://getbootstrap.com/docs/5.0/examples/album/">')
                    res.write('  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>')
                      
                    res.write('  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">')
                  
                    res.write('  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">')
                  
                    res.write('  <style>')
                    res.write('    .bd-placeholder-img {')
                        res.write('      font-size: 1.125rem;')
                        res.write('      text-anchor: middle;')
                        res.write('      -webkit-user-select: none;')
                        res.write('      -moz-user-select: none;')
                        res.write('      user-select: none;')
                        res.write('    }')
                  
                        res.write('    @media (min-width: 768px) {')
                            res.write('      .bd-placeholder-img-lg {')
                                res.write('        font-size: 3.5rem;')
                                res.write('      }')
                                res.write('    }')
                                res.write('    #outer')
                                res.write('{')
                                    res.write('    width:100%;')
                                    res.write('}')
                                    res.write('.inner')
                                    res.write('{')
                                        res.write('    display: inline-block;')
                                        res.write('}')
                                        res.write('  </style>')
                  
                      
                                        res.write('</head>')
                                        res.write('<body>')
                      
                                        res.write(' <header>')
                                        res.write('<div class="navbar navbar-dark bg-dark shadow-sm">')
                                        res.write('  <div class="container">')
                                        res.write('    <a href="/" class="navbar-brand d-flex align-items-center">')
                                        res.write('      <strong>My diary</strong>')
                                        res.write('    </a>')
                                        res.write('    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">')
                                        res.write('      <span class="navbar-toggler-icon"></span>')
                                        res.write('    </button>')
                                        res.write('  </div>')
                                        res.write('</div>')
                                        res.write(' </header>')
                  
                                        res.write('  <div class="container py-5">')
                                        res.write('    <div class="row mb-4">')
                                        res.write('      <div class="col-lg-8 mx-auto text-center">')
                                        res.write('          <h1 class="display-6">Edit Restaurant</h1>')
                                        res.write('      </div>')
                                        res.write('  </div> <!-- End -->')
                                        res.write('    <div class="row mt-4">')
                                        res.write('        <div class="col-lg-6 mx-auto">')
                                        res.write('            <div class="card ">')
                                        res.write('              <div class="card-header">')
                   
                                        res.write('<div class="tab-content">')
                                    
                                        res.write('     <div class="tab-pane fade show active pt-3">')
                                        res.write('        <form method="POST" action="/updateRestaurant/'+sk+'">')
                                        res.write('            <div class="form-group"> <label for="nameR">')
                                        res.write('                    <h6>Restaurant Name</h6>')
                                        res.write('                </label> <input type="text" name="nameR" id="nameR" placeholder="The Restaurants Name Goes Here..." required class="form-control " value = "'+nameR+'"> </div>')
                                                
                                        res.write('                <div class="form-group"> <label for="address">')
                                        res.write('                  <h6>Restaurant Address</h6>')
                                        res.write('          </label> <input type="text" name="address" id="address" placeholder="The Restaurants Address Goes Here..." required class="form-control" value = "'+address+'"> </div>')
                                                 
                                                
                                        res.write('            <div class="form-group"> <label for="phone">')
                                        res.write('               <h6>Restaurant Phone number</h6>')
                                        res.write('           </label>')
                                        res.write('            <div class="input-group"> <input type="text" id="phone" name="phone" placeholder="The Restaurants Phone Goes Here..." class="form-control" value = "'+phone+'" required>')
                                                        
                                        res.write('            </div>')
                                        res.write('       </div>')
                        
                                        res.write('       <div class="card-footer" id="outer"> <a href="/getAllRestaurants" class="subscribe btn btn-secondary btn-block shadow-sm"><i class="fas fa-arrow-left"></i> Go Back </a> <button type="submit" value = "submit" class="subscribe btn btn-secondary btn-block shadow-sm"> Save :) </button>')
                                        res.write('        </form>')
                                        res.write(' </div>')
                                        res.write(' </div> ')
                      
                                        res.write(' </div>')
                                        res.write('</div>')
                                        res.write('</div>')
                                        res.write('</div>')
                  
                  
                                        res.write(' <footer class="text-muted py-5">')
                                        res.write('   <div class="container text-center">')
                                        res.write('     <hr>')
                                        res.write('     &copy; <span id="year"></span>')
                                        res.write('  </div>')
                                        res.write(' </footer>')
                  
                  
                                        res.write('   <script src="/docs/5.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>')
                                        res.write('   <script>')
                                        res.write('     document.getElementById("year").innerHTML = new Date().getFullYear();')
                        
                                        res.write(' </script>')
                        
                                        res.write('      </body>')
                                        res.write('    </html>')
res.send()







                    
                }
            })
        } catch (err) {
            res.status(500).send(err)
        }
    })()
})


/////////////////////////////////////////////////////////////////////













app.post("/updateRestaurant/:sk", jsonParser, function (req, res) {
    var params = {
        TableName: "foods",
        Key: {
            "pk": "Restaurant",
            "sk": req.params.sk
        },
        UpdateExpression: "set nameR = :t, address = :l, phone = :e",
        ExpressionAttributeValues: {
            ":t": req.body.nameR,
            ":l": req.body.address,
            ":e": req.body.phone
        },
        ReturValues: "UPDATED_NEW"
    };

    dynamodb.update(params, function (err, response) {
        if (err) res.status(500).send(err)
        else {
            res.redirect("/getAllRestaurants")
        }
    })
})



app.post("/deleteRestaurant/:sk", function(req, res){
    var params = {
        TableName: "foods",
        Key: {
            "pk": "Restaurant",
            "sk": req.params.sk
        }
    };

    dynamodb.delete(params, function(err, response){
        if (err) res.status(500).send(err)
        else {
            res.redirect("/getAllRestaurants")
        }
    })
})

//movies - movies - movies - movies - movies - movies - movies - movies - movies - movies - //////
//movies - movies - movies - movies - movies - movies - movies - movies - movies - movies - //////
//movies - movies - movies - movies - movies - movies - movies - movies - movies - movies - //////
//movies - movies - movies - movies - movies - movies - movies - movies - movies - movies - //////
//movies - movies - movies - movies - movies - movies - movies - movies - movies - movies - //////

app.post("/createMovie", jsonParser, function (req, res) {
    let id = uuidv4();
    let date = new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' });

    (async () => {
        try {
            let data = {
                "pk": "Movie",
                "sk": id,
                "nameM": req.body.nameM,
                "genre": req.body.genre,
                "director": req.body.director,
                "runtime": req.body.runtime,
                "createdAt": date,
            };

            var params = {
                Item: data,
                ReturnConsumedCapacity: "TOTAL",
                TableName: "movies"
            };

            dynamodb.put(params, function (err, response) {
                if (err) res.status(500).send(err);
                else {
                    res.redirect("/getAllMovies")
                }
            })
        } catch (error) {
            return res.status(500).send(error);
        }
    })()

 
})

app.get("/getAllMovies", function (req, res) {
    var params = {
        TableName: "movies"
    }

    dynamodb.scan(params, function (err, response) {
        if (err) res.status(500).send(err)
        else {
         //   res.status(200).send(response.Items)
            res.write(' <!doctype html>')
            res.write('<html lang="en">')
            res.write('<head>')
            res.write('  <meta charset="utf-8">')
            res.write(' <meta name="viewport" content="width=device-width, initial-scale=1">')
            res.write(' <meta name="description" content="">')
            res.write('  <title>My diary app</title>')
         
            res.write('  <link rel="canonical" href="https://getbootstrap.com/docs/5.0/examples/album/">')
            res.write('<!-- Bootstrap core CSS -->')
            res.write(' <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">')
         
            res.write(' <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">')
         
            res.write('  <style>')
            res.write('    .bd-placeholder-img {')
                res.write('      font-size: 1.125rem;')
                res.write('      text-anchor: middle;')
                res.write('      -webkit-user-select: none;')
                res.write('      -moz-user-select: none;')
                res.write('      user-select: none;')
                res.write('    }')
          
                res.write('    @media (min-width: 768px) {')
                    res.write('      .bd-placeholder-img-lg {')
                        res.write('        font-size: 3.5rem;')
                        res.write('      }')
                        res.write('    }')
                        res.write('    #outer')
                        res.write('{')
                            res.write('    width:100%;')
                            res.write('}')
                            res.write('.inner')
                            res.write('{')
                                res.write('    display: inline-block;')
                                res.write('}')
                                res.write('  </style>')
          
         
         
                        res.write('</head>')
                        res.write(' <body>')
         
                        res.write('<header>')
         
                        res.write(' <div class="navbar navbar-dark bg-dark shadow-sm">')
                        res.write('   <div class="container">')
                        res.write('     <a href="/" class="navbar-brand d-flex align-items-center">')
                        res.write('      <strong>My diary</strong>')
                        res.write('    </a>')
                        res.write('    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">')
                        res.write('      <span class="navbar-toggler-icon"></span>')
                        res.write('    </button>')
                        res.write('  </div>')
                        res.write(' </div>')
                        res.write('</header>')
         
                        res.write('<main class="container">')
                        res.write('  <a href="/movieForm" class="btn btn-success mt-3 mb-3">Add <i class="fas fa-plus"></i></a>')
                        res.write('<h2 class="text-center mb-3">Movies</h2>')
            res.write('    <table class="table">')
            res.write('<thead class="thead">')
            res.write('  <tr class="table-success">')
            res.write('    <th scope="col">Fecha de creación</th>')
            res.write('    <th scope="col">Nombre</th>')
            res.write('    <th scope="col">Duración</th>')
            res.write('    <th scope="col">Género</th>')
            res.write('    <th scope="col">Dirección</th>')
            res.write('    <th scope="col">Acciones</th>')
            res.write('  </tr>')
            res.write('</thead>')
            res.write('<tbody>')
         
           response.Items.forEach(item => {
            res.write('  <tr>')
            res.write('    <th scope="row">'+item.createdAt+'</th>')
            res.write('   <td>'+item.nameM+'</td>')
            res.write('    <td>'+item.runtime+' horas</td>')
            res.write('    <td>'+item.genre+'</td>')
            res.write('    <td>'+item.director+'</td>')
            res.write('    <td><div id="outer"><a role="button" href="/getMovie/'+item.nameM+'"  class="btn btn-success inner"><i class="fas fa-eye"></i></a> <a role="button"  href="/editMovie/'+item.nameM+'" class="btn btn-success inner"><i class="fas fa-edit"></i></a>  <form action="/deleteMovie/'+item.sk+'" method="post" class="inner"><button type="submit" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button></form></div></td>')
            res.write('  </tr>')
           });
         
            res.write('</tbody>')
            res.write('</table>')
            res.write(' </div>')
         
            res.write('<footer class="text-muted py-5">')
            res.write(' <div class="container text-center">')
            res.write('   <hr>')
            res.write('   &copy; <span id="year"></span>')
            res.write(' </div>')
            res.write('</footer>')
         
         
            res.write('   <script src="/docs/5.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>')
            res.write('   <script>')
            res.write('     document.getElementById("year").innerHTML = new Date().getFullYear();')
            res.write(' </script>')
         
            res.write(' </body>')
            res.write('</html>')
            res.send()
        }
    })
})

app.get("/getMovie/:nameM", function (req, res) {
    (async () => {
        try {
            var params = {
                TableName: "movies",
                KeyConditionExpression: "pk = :pk",
                ExpressionAttributeValues: {
                    ":pk": "Movie",
                    ":nameM": req.params.nameM
                },
                ExpressionAttributeNames: {
                    "#nameM": "nameM"
                },
                FilterExpression: "#nameM = :nameM"
            };

            dynamodb.query(params, function (err, response) {
                if (err) res.status(500).send(err)
                else {
                    var selection = response.Items[0]
                    var nameM = selection['nameM']
                    var runtime = selection['runtime']
                    var genre = selection['genre']
                    var director = selection['director']

                    res.write(' <!doctype html>')
                    res.write('<html lang="en">')
                    res.write(' <head>')
                    res.write(' <meta charset="utf-8">')
                    res.write(' <meta name="viewport" content="width=device-width, initial-scale=1">')
                    res.write('<meta name="description" content="">')
                    res.write('<title>My diary app</title>')

                    res.write('<link rel="canonical" href="https://getbootstrap.com/docs/5.0/examples/album/">')
                    res.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>')
                    res.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">')

                    res.write('<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">')

                    res.write('<style>')
                    res.write(' .bd-placeholder-img {')
                        res.write('   font-size: 1.125rem;')
                        res.write('   text-anchor: middle;')
                        res.write('   -webkit-user-select: none;')
                        res.write('   -moz-user-select: none;')
                        res.write('   user-select: none;')
                        res.write(' }')

                        res.write(' @media (min-width: 768px) {')
                            res.write('   .bd-placeholder-img-lg {')
                                res.write('     font-size: 3.5rem;')
                                res.write('   }')
                                res.write(' }')
                                res.write(' #outer')
                                res.write('{')
                                    res.write('width:100%;')
                                    res.write('}')
                                    res.write('.inner')
                                    res.write('{')
                                        res.write('    display: inline-block;')
                                        res.write('}')
                                        res.write('    </style>')

                                        res.write('  </head>')
                                        res.write('  <body>')
    
                                        res.write('<header>')
  
                                        res.write('  <div class="navbar navbar-dark bg-dark shadow-sm">')
                                        res.write('    <div class="container">')
                                        res.write('      <a href="/" class="navbar-brand d-flex align-items-center">')
                                        res.write('        <strong>My diary</strong>')
                                        res.write('      </a>')
                                        res.write('      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">')
                                        res.write('        <span class="navbar-toggler-icon"></span>')
                                        res.write('      </button>')
                                        res.write('    </div>')
                                        res.write('  </div>')
                                        res.write('</header>')

                                        res.write('<div class="container py-5">')
                                        res.write('  <div class="row mb-4">')
                                        res.write('    <div class="col-lg-8 mx-auto text-center">')
                                        res.write('        <h1 class="display-6">New Movie</h1>')
                                        res.write('    </div>')
                                        res.write('  <div class="row mt-4">')
                                        res.write('      <div class="col-lg-6 mx-auto">')
                                        res.write('          <div class="card ">')
                                        res.write('              <div class="card-header">')
 
                                        res.write('                  <div class="tab-content">')
                                        res.write('                      <div class="tab-pane fade show active pt-3">')
                                        res.write('                          <form method="POST" action="/createMovie">')
                                        res.write('                              <div class="form-group"> <label for="nameM">')
                                        res.write('                                      <h6>Movie Name</h6>')
                                        res.write('                                  </label> <input type="text" name="nameM" id="nameM" placeholder="The Movies Name Goes Here..." required class="form-control " value="'+nameM+'" readonly> </div>')
                              
                                        res.write('                                  <div class="form-group"> <label for="runtime">')
                                        res.write('                                    <h6>Movie Runtime</h6>')
                                        res.write('                                </label> <input type="number" name="runtime" id="runtime" placeholder="The Movies Runtime Goes Here (in hours)..."  value="'+runtime+'" required class="form-control "readonly> </div>')
                                        res.write('                                <div class="form-group"> <label for="genre">')
                                        res.write('                                      <h6>Movie Genre</h6>')
                                        res.write('                                  </label>')
                                        res.write('                                  <div class="input-group"> <input type="text" id="genre" name="genre" placeholder="The Movies Genre Goes Here..."  value="'+genre+'" class="form-control "readonly required>')
                                        res.write('                                  </div>')
                                        res.write('                              </div>')
                                        res.write('                              <div class="form-group"> <label for="director">')
                                        res.write('                                <h6>Director</h6>')
                                        res.write('                            </label>')
                                        res.write('                            <div class="input-group"> <input type="text" id="director" name="director" placeholder="Directors name" class="form-control "  value="'+director+'" readonly required> ')
                                        res.write('                            </div>')
                                        res.write('                        </div>')
                                        res.write('                              <div class="card-footer" id="outer"> <a href="/getAllMovies" class="subscribe btn btn-success btn-block shadow-sm"><i class="fas fa-arrow-left"></i> Go Back </a>')
                                        res.write('                              </form>')
                                        res.write('                      </div>')
                                        res.write('                  </div> ')
                                        res.write('              </div>')
                                        res.write('          </div>')
                                        res.write('      </div>')
                                        res.write('  </div>')
                                        res.write('<footer class="text-muted py-5">')
                                        res.write('  <div class="container text-center">')
                                        res.write('    <hr>')
                                        res.write('    &copy; <span id="year"></span>')
                                        res.write(' </div>')
                                        res.write('</footer>')
                                        res.write('    <script src="/docs/5.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>')
                                        res.write('    <script>')
                                        res.write('      document.getElementById("year").innerHTML = new Date().getFullYear();')
                                        res.write('  </script>')
                                        res.write('  </body>')
                                        res.write('</html>')
                                        res.send();
                }
            })
        } catch (err) {
            res.status(500).send(err)
        }
    })()
})





app.get("/editMovie/:nameM", function (req, res) {
    (async () => {
        try {
            var params = {
                TableName: "movies",
                KeyConditionExpression: "pk = :pk",
                ExpressionAttributeValues: {
                    ":pk": "Movie",
                    ":nameM": req.params.nameM
                },
                ExpressionAttributeNames: {
                    "#nameM": "nameM"
                },
                FilterExpression: "#nameM = :nameM"
            };

            dynamodb.query(params, function (err, response) {
                if (err) res.status(500).send(err)
                else {
                    var selection = response.Items[0]
                    var nameM = selection['nameM']
                    var runtime = selection['runtime']
                    var genre = selection['genre']
                    var director = selection['director']
                    var sk = selection['sk']

                    res.write(' <!doctype html>')
                    res.write('<html lang="en">')
                    res.write(' <head>')
                    res.write(' <meta charset="utf-8">')
                    res.write(' <meta name="viewport" content="width=device-width, initial-scale=1">')
                    res.write('<meta name="description" content="">')
                    res.write('<title>My diary app</title>')

                    res.write('<link rel="canonical" href="https://getbootstrap.com/docs/5.0/examples/album/">')
                    res.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>')
                    res.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">')

                    res.write('<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">')

                    res.write('<style>')
                    res.write(' .bd-placeholder-img {')
                        res.write('   font-size: 1.125rem;')
                        res.write('   text-anchor: middle;')
                        res.write('   -webkit-user-select: none;')
                        res.write('   -moz-user-select: none;')
                        res.write('   user-select: none;')
                        res.write(' }')

                        res.write(' @media (min-width: 768px) {')
                            res.write('   .bd-placeholder-img-lg {')
                                res.write('     font-size: 3.5rem;')
                                res.write('   }')
                                res.write(' }')
                                res.write(' #outer')
                                res.write('{')
                                    res.write('width:100%;')
                                    res.write('}')
                                    res.write('.inner')
                                    res.write('{')
                                        res.write('    display: inline-block;')
                                        res.write('}')
                                        res.write('    </style>')

                                        res.write('  </head>')
                                        res.write('  <body>')
    
                                        res.write('<header>')
  
                                        res.write('  <div class="navbar navbar-dark bg-dark shadow-sm">')
                                        res.write('    <div class="container">')
                                        res.write('      <a href="/" class="navbar-brand d-flex align-items-center">')
                                        res.write('        <strong>My diary</strong>')
                                        res.write('      </a>')
                                        res.write('      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">')
                                        res.write('        <span class="navbar-toggler-icon"></span>')
                                        res.write('      </button>')
                                        res.write('    </div>')
                                        res.write('  </div>')
                                        res.write('</header>')

                                        res.write('<div class="container py-5">')
                                        res.write('  <div class="row mb-4">')
                                        res.write('    <div class="col-lg-8 mx-auto text-center">')
                                        res.write('        <h1 class="display-6">New Movie</h1>')
                                        res.write('    </div>')
                                        res.write('  <div class="row mt-4">')
                                        res.write('      <div class="col-lg-6 mx-auto">')
                                        res.write('          <div class="card ">')
                                        res.write('              <div class="card-header">')
 
                                        res.write('                  <div class="tab-content">')
                                        res.write('                      <div class="tab-pane fade show active pt-3">')
                                        res.write('                          <form method="POST" action="/updateMovie/'+sk+'">')
                                        res.write('                              <div class="form-group"> <label for="nameM">')
                                        res.write('                                      <h6>Movie Name</h6>')
                                        res.write('                                  </label> <input type="text" name="nameM" id="nameM" placeholder="The Movies Name Goes Here..." required class="form-control " value="'+nameM+'" > </div>')
                              
                                        res.write('                                  <div class="form-group"> <label for="runtime">')
                                        res.write('                                    <h6>Movie Runtime</h6>')
                                        res.write('                                </label> <input type="number" name="runtime" id="runtime" placeholder="The Movies Runtime Goes Here (in hours)..."  value="'+runtime+'" required class="form-control "> </div>')
                                        res.write('                                <div class="form-group"> <label for="genre">')
                                        res.write('                                      <h6>Movie Genre</h6>')
                                        res.write('                                  </label>')
                                        res.write('                                  <div class="input-group"> <input type="text" id="genre" name="genre" placeholder="The Movies Genre Goes Here..."  value="'+genre+'" class="form-control " required>')
                                        res.write('                                  </div>')
                                        res.write('                              </div>')
                                        res.write('                              <div class="form-group"> <label for="director">')
                                        res.write('                                <h6>Director</h6>')
                                        res.write('                            </label>')
                                        res.write('                            <div class="input-group"> <input type="text" id="director" name="director" placeholder="Directors name" class="form-control "  value="'+director+'"  required> ')
                                        res.write('                            </div>')
                                        res.write('                        </div>')
                                        res.write('                              <div class="card-footer" id="outer"> <a href="/getAllMovies" class="subscribe btn btn-success btn-block shadow-sm"><i class="fas fa-arrow-left"></i> Go Back </a> <button type="submit" value = "submit" class="subscribe btn btn-success btn-block shadow-sm"> Save :) </button>')
                                        res.write('                              </form>')
                                        res.write('                      </div>')
                                        res.write('                  </div> ')
                                        res.write('              </div>')
                                        res.write('          </div>')
                                        res.write('      </div>')
                                        res.write('  </div>')
                                        res.write('<footer class="text-muted py-5">')
                                        res.write('  <div class="container text-center">')
                                        res.write('    <hr>')
                                        res.write('    &copy; <span id="year"></span>')
                                        res.write(' </div>')
                                        res.write('</footer>')
                                        res.write('    <script src="/docs/5.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>')
                                        res.write('    <script>')
                                        res.write('      document.getElementById("year").innerHTML = new Date().getFullYear();')
                                        res.write('  </script>')
                                        res.write('  </body>')
                                        res.write('</html>')
                                        res.send();
                }
            })
        } catch (err) {
            res.status(500).send(err)
        }
    })()
})






app.post("/updateMovie/:sk", jsonParser, function (req, res) {
    var params = {
        TableName: "movies",
        Key: {
            "pk": "Movie",
            "sk": req.params.sk
        },
        UpdateExpression: "set nameM = :t, genre = :l, director = :e, runtime = :r",
        ExpressionAttributeValues: {
            ":t": req.body.nameM,
            ":l": req.body.genre,
            ":e": req.body.director,
            ":r": req.body.runtime
        },
        ReturValues: "UPDATED_NEW"
    };

    dynamodb.update(params, function (err, response) {
        if (err) res.status(500).send(err)
        else {
            res.redirect("/getAllMovies")
        }
    })
})



app.post("/deleteMovie/:sk", function(req, res){
    var params = {
        TableName: "movies",
        Key: {
            "pk": "Movie",
            "sk": req.params.sk
        }
    };

    dynamodb.delete(params, function(err, response){
        if (err) res.status(500).send(err)
        else {
            res.redirect("/getAllMovies")
        }
    })
})


//books - books - books - books - books - books - books - books - books - books - //////
//books - books - books - books - books - books - books - books - books - books - //////
//books - books - books - books - books - books - books - books - books - books - //////
//books - books - books - books - books - books - books - books - books - books - //////
//books - books - books - books - books - books - books - books - books - books - //////



app.post("/createBook", jsonParser, function (req, res) {
    let id = uuidv4();
    let date = new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' });

    (async () => {
        try {
            let data = {
                "pk": "Book",
                "sk": id,
                "nameB": req.body.nameB,
                "genre": req.body.genre,
                "writter": req.body.writter,
                "editorial": req.body.editorial,
                "createdAt": date,
            };

            var params = {
                Item: data,
                ReturnConsumedCapacity: "TOTAL",
                TableName: "books"
            };

            dynamodb.put(params, function (err, response) {
                if (err) res.status(500).send(err);
                else {
                    res.status(200).send(data);
                }
            })
        } catch (error) {
            return res.status(500).send(error);
        }
    })()

 
})


var server = app.listen(4000, function () {
    console.log("Corriendo en localhost:4000 :)")
})

module.exports.handler = serverless(app);
