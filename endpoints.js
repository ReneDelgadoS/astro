/*
    René Delgado Servín 30/05/2022
    ******************************
    Endpoint configuration and loading.
*/
//Load db 
const db = required('/db')
//Load validddator
const ajv = required('/validator')


//load get endpoint
function loadGetEndpoint(app){
    app.get('/pictures',async (req,res)=>{
        let validatecount= ajv.getSchema('get /pictures count')
        let validcount= validatecount(req.query)
        if(!validcount){
            let data = await db.ordered_entriesRef.limit(1).get().then(
                query=>{
                    return query.docs[0].data()
                }
            )
            res.send(JSON.stringify({count:1,entries:[data]}))
            return
        }
        let validateget = ajv.getSchema('get /pictures')
        let validget= validateget(req.query)
        if(validget){
            let newest_date = 'newest_date' in req.query ? req.query.newest_date : (new Date()).toISOString().split('T')[0]
            let oldest_date = 'oldest_date' in req.query ? req.query.oldest_date : '2022-05-30'
            let offset = 'offset' in req.query ? req.query.offset: 1
            const query = await db.ordered_entriesRef.where(`additiondate`,'<=',newest_date).where(`additiondate`,'>=',oldest_date).limit(req.query.count).offset(20).get(offset-1).then(
            query=>{
                if(query.empty){
                    res.send(JSON.stringify({code:'404',msg:'No entries matchig query found.'}))
                    return
                }
                let out = []
                if('filter' in req.query){
                    for(doc of query.docs){
                        if(doc.get('title').includes(req.query.filter)||doc.get('explanation').includes(req.query.filter)){
                            out.push(doc.data())
                        }
                    }
                }
                else{
                    out=query.docs   
                }
                if(out.length==0){
                    res.send(JSON.stringify({code:'404',msg:'No entries matchig query found.'}))
                }
                else res.send(JSON.stringify({count:out.length,entries:out}))      
            })   
        }
        else{
            res.send(JSON.stringify({code:'400',msg:'Bad request'}))  
        }
    })
}
//load post endpoint
function loadPostEndpoint(app) {
    app.post('/pictures',async (req,res)=>{
        let validatePost= ajv.getSchema('post /pictures count')
        let validPost= validatePost(req.body)
        if(!validPost){
            res.send(JSON.stringify({code:'400',msg:'Bad request. Post request requirements can be found in thee docs https://github.com/ReneDelgadoS/astro'}))
            return
        }
        let now = (new Date()).toISOString().split('T')[0]
        let entry = req.body.entry
        entry['additiondate']=now
        let key = req.body.key
        let keyRef = db.keysRef.doc(key)
        await keyRef.get().then((doc)=>{
            if(!doc.exists){
                res.send(JSON.stringify({code:'403',msg:'The given key cant add entries. Keep in mind that each key has a maximmun amount of writes per day.'}))
                return
            }
            let data = doc.data()
            if(data.last_write_date == now){
                if(data.writes>=daily_writes){
                    res.send(JSON.stringify({code:'403',msg:'The given key cant add entries. Keep in mind that each key has a maximmun amount of writes per day.'}))
                    return
                }
                db.entriesRef.add(entry).then(()=>{
                    keyRef.update({writes:data.writes+1,total_writes:data.total_writes+1})
                })
            }
        })
    })
}
//load all endpoints
function load(app){
    loadGetEndpoint(app)
    loadPostEndpoint(app)
}
module.exports = {load:load}