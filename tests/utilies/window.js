
export async function windowhandling(page, action) {

    let [popup] = await Promise.all([
        page.waitForEvent('popup'),
        action
    ]);

    return popup;
}
