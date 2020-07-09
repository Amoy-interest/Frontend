import { createStyles, makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import React from 'react'

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            textAlign: 'center',
            // position: 'fixed',
            width: '100%',
            bottom: 0,
            paddingTop: theme.spacing(),
            paddingBottom: theme.spacing(),
            backgroundColor: theme.palette.primary.main,
            opacity: 0.7
        },
        footerText: {
            color: 'grey',
            fontSize: 'small',
            textDecoration: 'none'
        }
    })
)


export default function FooterBar () {
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
                    rel='noopener noreferrer'
                    target='_blank'
                >
                    Designed by Group 10
                </a>
            </Typography>
        </footer>
    )
}

