import React, { useContext, useState, useCallback, useEffect } from 'react';
import QlikContext from './QlikContext';


const ObjectsContext = React.createContext(null)
export default ObjectsContext;

const ObjectsProvider = ({ children }) => {
    const { app } = useContext(QlikContext)
    const [objects, setObjects] = useState([])

    const saveObjectToState = useCallback((newObj) => {
        setObjects((curr) => [...curr, newObj])
      }, [])

    const getObject = useCallback(
        async (objectId) => {
            let model
            try {
                model = await app.getObject(objectId)
            } catch (err) {
            throw new Error ('Unable to find this objectId')
            }
            const layout = await model.getLayout()
            const props = await model.getProperties()
            props.qHyperCubeDef.qInitialDataFetch = [
              {
                qTop: 0,
                qLeft: 0,
                qWidth: layout.qHyperCube.qSize.qcx,
                qHeight: layout.qHyperCube.qSize.qcy,
              },
            ]
            await model.setProperties(props)

            saveObjectToState({
                id: model.id,
                type: 'cube'
            })
            return model
        }, [app, saveObjectToState] )
      

        const getObjectLayout = useCallback(async (model) => {
            // const timer = () => new Promise((res) => setTimeout(res, 200))
            let layout
            while (!layout) {
              try {
                layout = await model.getLayout()
                // console.log('layout', layout)
              } catch (err) {
               throw new Error ('unable to find this layout')
              }
            }
        
            return layout
          }, [])


    return (
        <ObjectsContext.Provider value={{ objects, getObject, getObjectLayout }} >
            {children}
        </ObjectsContext.Provider>
    )
}

export { ObjectsProvider } 