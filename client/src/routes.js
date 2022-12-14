import React from "react"
import {Route,Switch,Redirect} from "react-router-dom"
import {LinksPage} from "./pages/LinksPage"
import {DetailPage} from "./pages/DetailPage"
import {CreatePage} from "./pages/CreatePage"
import {AuthPage} from "./pages/AuthPage"


export const  useRoutes = isAuthentificated => {
    if(isAuthentificated){
         return (
            <Switch>
                <Route path ="/links" exact>
                    <LinksPage />
                </Route>
                <Route path ="/create" exact>
                    <CreatePage />
                </Route>
                <Route path ="/detail/:id" exact>
                    <DetailPage />
                </Route>
                <Redirect to="/create"/>
           </Switch>
         )
    }

  return (
    <Switch>
        <Route path ="/" exact>
            <AuthPage />
        </Route>
        <Redirect to="/"/>
    </Switch>
  );
}
