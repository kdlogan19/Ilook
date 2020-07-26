export default function Comment({commentData}) {
    // console.log("date:", commentData)
    return (
        <div className="container comment-box-container">
            <div className="comment-box row">
                <div className="user-image-box col">

                </div>
                <div className="user-text-box col">
                    <div className="user-info row">
                        <p>{commentData.username}</p>
                    </div>
                    <div className="comment-text row">
                        <p>{commentData.commentText}</p>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .comment-box-container {
                    padding-top: 10px;
                    padding-bottom: 10px;
                }
                .comment-box {
                    // width: 100%;
                    justifyContent: center;
                    border: 1px solid rgba(0,0,0,.125);
                }
            `}</style>
        </div>
    )
}