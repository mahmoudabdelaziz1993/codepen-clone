import React, { useState } from 'react'
// import Codemirror css js languages
import 'codemirror/lib/codemirror.css'
import "codemirror/theme/monokai.css"
import "codemirror/mode/xml/xml"
import "codemirror/mode/javascript/javascript"
import "codemirror/mode/css/css"
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/scroll/simplescrollbars'
import { Controlled as ControlledEditor } from 'react-codemirror2'
import { Minimize, Fullscreen ,WebAsset } from '@material-ui/icons'
import { Box, Typography, IconButton, makeStyles, Collapse } from '@material-ui/core'
const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        flexBasis: 0,
        padding: "1rem",
        maxWidth:'80%',
        order:1
    },
    head: {
        borderTopRightRadius: "1rem",
        borderTopLeftRadius: '1rem',
        background: "#6e6d6d",
        color: '#ff7171',
        padding: '0 0 0 10px',
        display: 'flex',
        alignItems: 'center '

    },
    wrapper: {
        flexGrow: 1,
        overflow: 'auto !important',
        width: "100%",
        maxHeight: "360px"
    }
})


function Editor(props) {
    const [open, setOpen] = useState(true)
    const { displayName, language, value, onChange } = props

    const classes = useStyles()

    const handleChange = (editor, data, value) => {
        onChange(value)
    }

    return (
        <Box className={classes.root}
            style={{ flexGrow: ` ${open ? 1 : 0}` }}
            id={open ? "" : "collaps"}

        >
            <Box className={classes.head}>
                {open ?
                    <Typography color='inherit' variant='body1'>
                        {displayName} 
                    </Typography>
                    :
                    <WebAsset/>
                }

                <Box style={{ flexGrow: 1 }} />
                <IconButton
                    color='inherit'
                    onClick={() => setOpen(prevOpen => !prevOpen)}
                >
                    {open ? <Minimize /> : <Fullscreen />}

                </IconButton>
            </Box>

            <Collapse in={open}>
                <ControlledEditor
                    onBeforeChange={handleChange}
                    value={value}
                    options={{
                        lineWrapping: true,
                        lint: true,
                        mode: language,
                        lineNumbers: true,
                        theme: 'monokai',
                        autoCloseTags:true,
                    
                        
                    }}
                    className={classes.wrapper}


                />
            </Collapse>

        </Box>
    )
}

export default Editor
