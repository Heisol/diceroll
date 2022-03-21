import { useState } from 'react';
import { Sentry } from "react-activity";
import "react-activity/dist/Sentry.css";
import styles from '../../../styles/user.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut} from '@fortawesome/free-solid-svg-icons'
const UserBar = ({signIn, signedIn, user, fetching, signOut}: {signIn: any, signedIn: boolean, user:any, fetching:boolean, signOut:any}) => {

    const [visible, setVisible] = useState<boolean>(false)

  return (
    <div className="container my-3 p-1 d-flex flex-row-reverse">
        {!signedIn && <button className='btn border' style={{boxShadow: '1vw'}} onClick={signIn} disabled={fetching}>
            {fetching ? <Sentry/> : 
            <div className={`${styles['changeOpacity']}`}>
            <span className=''><img alt='google icon' src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'/>  </span>
            <span>Sign in</span>
            </div>
            }
        </button>}
        { signedIn && 
        <div className="container d-flex flex-row-reverse align-items">
                <div className={`${styles['userIconContainer']}`} onMouseOver={()=>setVisible(true)} onMouseLeave={()=>setVisible(false)}>
                    {fetching ? <Sentry/>
                    : <>
                    <span className={`${styles['changeOpacity']}`} onClick={()=>signOut()} style={{width: '100%', textAlign: 'center'}} hidden={!visible}><FontAwesomeIcon icon={faSignOut}/> Sign Out</span>
                    <span hidden={visible} id={styles.test} ><img className={styles.userIcon} src={user.photoURL} alt="Profile Photo" /></span>
                    </>
                    }
                </div>
                
        </div>
        }
    </div>
  )
}

export default UserBar