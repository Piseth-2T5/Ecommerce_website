const Post = require('../model/model')

exports.getHomepage = (req,res)=>{
    res.render('home.ejs');
}
exports.getProduct = (req,res) =>{
    res.render('product.ejs')
}
exports.getSignInPage = (req,res)=>{
    res.render('signIn.ejs')
    res.redirect('/')
}
exports.getSignUpPage = (req,res)=>{
    res.render('signUp.ejs')
    res.redirect('/')
}
exports.getPosts = (req,res)=>{
    Post.find()
        .then(result=>{
            console.log('get post success');
            res.json({"message":"success","data": result})
        })
        .catch(err=>{
            console.log("err for get post:" ,err)
        })
}
exports.createPost = (req,res)=>{
    const post = new Post({
        text: req.body.message,
        publisher: "User",
        // date: req.body.date,
    })
    post.save()
        .then(result=>{
            res.redirect('/product');
        })
        .catch(err=>{
            console.log("error : ",err)
        })
}
exports.deletePost = (req,res)=>{
    const id = req.params.postID
    console.log(id)
    Post.findByIdAndRemove(id)
        .then(response=>{
            console.log('message delete successsfuly')
            res.json({"message":"success"})
        })
        .catch(err=>{
            console.log(err)
        })
}