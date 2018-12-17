    import { renderToString } from 'react-dom/server'
    import Express from 'express'

    const app = Express()

    app.use(function(req, res){

        // Create a new Redux store instance
        const store = createStore(counterApp)

        // Render the component to a string
        const html = renderToString(
            <Provider store={store}>
                <App />
            </Provider>
        )

        // Grab the initial state from our Redux store
        const preloadedState = store.getState()

        // Send the rendered page back to the client
        res.send(renderFullPage(html, preloadedState))
    })

    app.listen(8080, function () {/* ... */})


