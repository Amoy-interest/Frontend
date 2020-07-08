import { createStyles, makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import React from 'react'

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            zIndex: theme.zIndex.drawer + 1,
            textAlign: 'center',
            position: 'fixed',
            width: '100%',
            bottom: 0,
            paddingTop: theme.spacing(),
            paddingBottom: theme.spacing(),
            backgroundColor: theme.palette.primary.main,
            opacity: 0.85
        },
        footerText: {
            color: 'white',
            fontSize: 'small',
            textDecoration: 'none'
        }
    })
)


export default function Footer () {
    const classes = useStyles()

    return (
        <footer className={classes.root}>
            <Typography className={classes.footerText} variant='subtitle1' noWrap>
                Amoy Interest
            </Typography>
            <Typography className={classes.footerText} variant='caption' noWrap>
                <a
                    className={classes.footerText}
                    href='https://github.com/Amoy-interest'
                    rel='github url'
                    target='_blank'
                >
                    Designed by group 10
                </a>
            </Typography>
        </footer>
    )
}

