export default function Home() {

    const [data, setData] = useState({});
    const [images, setImages] = useState([]);
    useEffect(() => {

        function createImagesData(data) {
            let images = data.hunde.map(function (h) {
                let image = {
                    original: BASE_URL + h.previewImage.path,
                    thumbnail: ""
                };

                fetch(BASE_URL + "/api/cockpit/image?token=3a862e4d2916b5843a7809c4c973b5", {
                    method:'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        src: h.previewImage.path,
                        m: 'thumbnail',
                        w: 200
                    })
                })
                    .then(data => data.text())
                    .then(data => image.thumbnail = data);

                return image;
            });
            setImages(images);
        };

        fetch(BASE_URL + '/api/singletons/get/home', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ populate: true })
        })
            .then(data => data.json())
            .then(data => {
                setData(data);
                console.log(data);
                createImagesData(data);
            });
    }, []);

    return (
        <div>
            <h2>{data.title}</h2>
            {/* <ReactImageGallery items={images} showFullscreenButton={false} autoPlay={false} showPlayButton={false} /> */}
        </div>
    );
}