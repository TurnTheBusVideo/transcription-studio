import { getSessionCookie, setSessionCookie } from './sessions';
const authMgr = {
    getSession: () => getSessionCookie('session'),
    setSession: (obj) => setSessionCookie(obj),
    isAuthenticated: () => {
        const sessionObject = getSessionCookie('session');
        const authStatus = sessionObject?.email ? true : false;
        return authStatus;
    },
    isAdmin: () => {
        if (authMgr.isAuthenticated()) {
            const sessionObject = getSessionCookie('session');
            return sessionObject?.isAdmin ? true : false;
        }
        return false;
    },
    isScheduler: () => {
        if (authMgr.isAuthenticated()) {
            const sessionObject = getSessionCookie('session');
            return sessionObject?.isScheduler ? true : false;
        }
        return false;
    },
    getAuthToken: () => {
        if (authMgr.isAuthenticated()) {
            const sessionObject = getSessionCookie('session');
            return sessionObject?.authToken || false;
        }
        return false;
    },
    getUsername: () => {
        if (authMgr.isAuthenticated()) {
            const sessionObject = getSessionCookie('session');
            return sessionObject?.email || false;
        }
        return false;
    },
    getName: () => {
        if (authMgr.isAuthenticated()) {
            const sessionObject = getSessionCookie('session');
            return sessionObject?.name || false;
        }
        return false;
    }
};

export default authMgr;