'use server'

export async function CarregarMenus() {
    try {
        const result = await fetch(process.env.API_URL + 'MenuHeader', {
            next: { tags: ['menus'] },
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        if (!result.ok) throw new Error('Falha ao buscar os menus.')
        
        return await result.json()
    } catch (error) {
        console.log(error)

        return [
            {
                id: '1',
                nome: 'Home',
                href: '/Home',
            },
        ]
    }
}
