

/* FRONTEND */ 

    const [products, setProducts] = useState([]); 

    useEffect(() => { // <- useEffect function 
        const fetchProducts = async () => { // <- async function
            const {data} = await axios.get('/api/products') // <- pauses your code on that line until the promise fulfills, then return the resulting value.

            setProducts(data)
        }
        fetchProducts();
    },[]);


/* BACKEND

    [ SET UP MIDDLEWARE ] */ 

        app.get('/api/products', (req, res) => { 
            res.json(products) // <- RETURNS JSON DATA TO THE REQUEST  
        })
        

        // [ Below is an example of how to get a spesific bit of data found by its id  ]


/* FRONTEND */ 

        useEffect(() => {
            const fetchProduct = async () => {
                const {data} = await axios.get(`/api/products/${match.params.id}`)
    
                setProduct(data)
            }
            fetchProduct();
        },[]);


/* BACKEND */

            app.get('/api/products/:id', (req, res) => {
                const product = products.find(p => p._id === req.params.id)
                res.json(product)
            })
        
        