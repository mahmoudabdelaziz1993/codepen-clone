import React, { useState, useEffect } from 'react';
import { Box, makeStyles } from '@material-ui/core'
import Editor from './components/Editor';
import useLocalStorage from './data/LocalStorage'


const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    height: "100vh",
    margin: 0,
    padding: 0

  },
  apptop: {
    width: '100%',
    height: "100%",
    background: "#41444b",
    display: 'flex',
    padding: '1rem',
    justifyContent: 'space-evenly'
  },
  appbottom: {
    width: '100%',
    height: "100%"
  }
})

function App() {

  const [html, setHtml] = useLocalStorage('html','')
  const [css, setCss] = useLocalStorage('css','')
  const [js, setJs] = useLocalStorage('js','')
  const [srcDoc, setSrcDoc] = useState('')
  // slowe down excution 
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setSrcDoc( `
     <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Document</title>
   </head>
   <body>
       ${html}
   </body>
   <style> ${css} </style>
   <script> ${js}</script>
   </html>
     `)
    }, [250])

    return ()=> clearTimeout(timeOut)
  }, [html, css, js])




  const classes = useStyles()


  return (
    <Box className={classes.root}>
      <Box className={classes.apptop}>
        <Editor
          displayName='HTML'
          language='xml'
          value={html}
          onChange={setHtml}
        />
        <Editor
          displayName='CSS'
          language='css'
          value={css}
          onChange={setCss}
        />
        <Editor
          displayName='JavaScript'
          language='js'
          value={js}
          onChange={setJs}
        />
      </Box>
      <Box className={classes.appbottom}>
        <iframe title="Codepan clone " sandbox='allow-scripts' width='100%' height='100%' srcDoc={srcDoc}>
        </iframe>
      </Box>
    </Box>
  );
}

export default App;
