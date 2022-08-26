const isUserRouter=(to,from,next)=>{
    if(to.fullPath==="/about"){
        next()
        return
    }
  const user=localStorage.getItem('user')
  if(user)return next()
  next('/about')
   
}
export default isUserRouter