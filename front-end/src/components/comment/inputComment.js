import React, { useState } from 'react'

const InputComment = () => {

    const [content, setContent] = useState('')
    return (
        <form>
            <input type="text" placeholder="Add comment..."
            value={content} onChange={e => setContent(e.target.value)} />

            <button type="submit" className="postBtn">
                Post
            </button>
        </form>
    )
}

export default InputComment