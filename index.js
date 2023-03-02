
const reqURL = 'https://dictionary.yandex.net/api/v1/dicservice/lookup?'

function OnResponce(method, url, body = null)
{
    return new Promise
    (
        (resolve, reject) =>
        {
            const xhr = new XMLHttpRequest()

            url = url + 'key=' + body.key + '&lang=' + body.lang + '&text=' + body.text
            xhr.open(method, url)

            xhr.onload = () =>
            {
                if(xhr.status >= 400)
                {
                    reject(xhr.response)
                }
                else
                {
                    resolve(xhr.response)
                }
            }

            xhr.onerror = () =>
            {
                reject(xhr.response)
            }

            xhr.send()
        }
    )
}

let body =
{
    key: 'dict.1.1.20230225T150610Z.cdb88a3cfc4b0025.34d3d57db63eb37685bc6d1462727b4c045c3f9e',
    text: 'sky',
    lang: 'en-ru',
    ui: 'ru'
}

OnResponce('GET', reqURL, body)
    .then(data =>
    {
        const xml = (new DOMParser()).parseFromString(data, "text/xml");
        console.log(xml)
    })
    .catch(err => console.error(err))





