export function getAvatarUrl(file){
    if(!file){
        return'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'
    }

    return `https://ejlewvvxvpuigquvzwvg.supabase.co/storage/v1/object/sign/avatars/${file}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzLzAuMDcxODQ2Mjk4NzUxMzA5NTUud2VicCIsImlhdCI6MTczOTI3MTQyMSwiZXhwIjoxNzcwODA3NDIxfQ.e8dTEDaSwMeObv5OFdbpX1sGXReEzCakLvpRsMaUKH4`
}