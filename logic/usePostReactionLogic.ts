export function usePostReactionLogic(postId: string) {
    enum PostReaction {
        LIKE = 'like',
        DISLIKE = 'dislike',
        SWITCH_TO_LIKE = 'switchToLike',
        SWITCH_TO_DISLIKE = 'switchToDislike',
        FROM_LIKE_TO_NONE = 'fromLikeToNone',
        FROM_DISLIKE_TO_NONE = 'fromDislikeToNone',
        NONE = 'none',
    }
    const postReaction = ref<PostReaction>(PostReaction.NONE)

    const makeLikeButtonHandler = () => {
        switch (postReaction.value) {
            case PostReaction.LIKE:
                postReaction.value = PostReaction.FROM_LIKE_TO_NONE
                break

            case PostReaction.DISLIKE:
                postReaction.value = PostReaction.SWITCH_TO_LIKE
                break

            case PostReaction.NONE:
                postReaction.value = PostReaction.LIKE
                break

            default:
                break
        }

        return fetchPostReaction()
    }

    const makeReactionButtonHandler = async (
        reactionType: 'like' | 'dislike'
    ) => {
        let likesAmount: null | { likes: number } = null
        switch (reactionType) {
            case 'like':
                likesAmount = (await makeLikeButtonHandler()) as {
                    likes: number
                }
                break
            case 'dislike':
                likesAmount = (await makeDislikeButtonHandler()) as {
                    likes: number
                }
                break

            default:
                console.warn('Undefined reaction')
                break
        }

        return likesAmount?.likes
    }

    const makeDislikeButtonHandler = () => {
        switch (postReaction.value) {
            case PostReaction.DISLIKE:
                postReaction.value = PostReaction.FROM_DISLIKE_TO_NONE
                break

            case PostReaction.LIKE:
                postReaction.value = PostReaction.SWITCH_TO_DISLIKE
                break

            case PostReaction.NONE:
                postReaction.value = PostReaction.DISLIKE
                break

            default:
                break
        }

        return fetchPostReaction()
    }

    const performFromSwitchToDefaultReaction = () => {
        switch (postReaction.value) {
            case PostReaction.SWITCH_TO_DISLIKE:
                postReaction.value = PostReaction.DISLIKE
                break

            case PostReaction.SWITCH_TO_LIKE:
                postReaction.value = PostReaction.LIKE
                break

            case PostReaction.FROM_LIKE_TO_NONE:
                postReaction.value = PostReaction.NONE
                break

            case PostReaction.FROM_DISLIKE_TO_NONE:
                postReaction.value = PostReaction.NONE
                break
        }
    }

    const fetchPostReaction = async () => {
        const payload = JSON.stringify({
            postId,
            postReaction: postReaction.value,
        })

        const { data, error } = await useFetch<{ likes: number }>(
            '/api/posts/perform-reaction',
            {
                method: 'POST',
                body: payload,
            }
        )

        if (error.value) {
            navigateTo('/')
            return
        }

        performFromSwitchToDefaultReaction()
        return data.value
    }

    return {
        makeReactionButtonHandler,
        postReaction,
    }
}
