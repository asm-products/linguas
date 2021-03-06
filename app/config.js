Parse.initialize("1OvgqBw2CbJZ5imywS7BnQYcSv5ZxhDoUxjMKMBu", "9S6LjTTm9iyLiTrsqgTieRdQB7TXrM6020F3tmKV");

window.fbAsyncInit = function () {
    Parse.FacebookUtils.init({ // this line replaces FB.init({
        appId: '395094303975272', // Facebook App ID
        status: true,  // check Facebook Login status
        cookie: true,  // enable cookies to allow Parse to access the session
        xfbml: true,  // initialize Facebook social plugins on the page
        version: 'v2.2' // point to the latest Facebook Graph API version
    });

    // Run code after the Facebook SDK is loaded.
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/* end of parse and facebook configuration  */


var availableLanguages = [
    {name: 'English', code: 'en-us'},
    {name: 'Türkçe', code: 'tr-tr'},
    {name: 'Deutsch', code: 'de-de'},
    {name: 'Español', code: 'es-es'},
    {name: 'Italiano', code: 'it-it'},
    {name: 'Français', code: 'fr-fr'},
    {name: 'Português', code: 'pt-pt'},
    {name: 'Pусский', code: 'ru-ru'},
    {name: 'العربية', code: 'ar-sa'},
    {name: '한국의', code: 'ko'},
    {name: '中國', code: 'zh-cn'},
    {name: '日本人', code: 'ja'}
];

var dictionary = {
    en_us: {
        what_is_linguas: "What is Linguas?",
        linguas_description: "Linguas is a web site where we practice languages by learning a new sentence every day. One English sentence is added every morning and the translations in other languages are added by the users voluntarily. Therefore, while users practice languages they also help others to learn. If you want, you can also contribute by adding translations in the languages you speak.",
        install_chrome_app: "Click to install Linguas Chrome Extension",
        connect_with_facebook: "Connect with Facebook",
        login_to_add_translation: "You need to login to add translation.",
        a1: "Beginner level",
        a2: "Elementary level",
        b1: "Pre intermediate level",
        b2: "Intermediate level",
        c1: "Upper intermediate level",
        c2: "Advanced level",
        add_translation: "add translation",
        sentence: "Sentence",
        added_by: "added by",
        listen: "listen",
        delete: "delete"
    },
    tr_tr: {
        what_is_linguas: "Linguas nedir?",
        linguas_description: "Linguas bizim her gün yeni bir cümle öğrenerek dilimizi geliştirdiğimiz bir web sitesidir. Her sabah yeni bir İngilizce cümle eklenir ve gönüllü kullanıcılar da bu cümleleri diğer dillere çevirir. Bu şekilde kullanıcılarımız dil pratiği yaparken aynı zamanda başka insanlara da yardım etmiş olurlar. Eğer isterseniz siz de cümleleri bildiğiniz dillere çevirerek katkıda bulunabilirsiniz.",
        install_chrome_app: "Linguas Chrome Eklentisini yüklemek için tıklayın",
        connect_with_facebook: "Facebook ile bağlan",
        login_to_add_translation: "Çeviri ekleyebilmek için giriş yapmalısınız.",
        a1: "Başlangıç seviyesi",
        a2: "Temel seviye",
        b1: "Orta altı seviye",
        b2: "Orta seviye",
        c1: "Orta üstü seviye",
        c2: "İleri düzey",
        add_translation: "çeviri ekle",
        sentence: "Cümle",
        added_by: "ekleyen",
        listen: "dinle",
        delete: "sil"
    },
    ar_sa: {
        what_is_linguas: "ما هو Linguas ؟",
        linguas_description: "LINGUAS هو موقع يساعد علي تعلم اللغات عن طريق أضافة جملة في اللغة الإنجليزية كل صباح ويتم إضافة ترجمات بلغات أخرى من قبل المستخدمين طوعا. لذلك، مشاركة المستخدمين اللغات تساعد أيضا آخرين للتعلم. إذا كنت تريد، يمكنك أيضا المساهمة بإضافة ترجمة بلغتك.",
        install_chrome_app: "تثبيت ملحق chrome",
        connect_with_facebook: "سجل دخول  Facebook",
        login_to_add_translation: "يجب تسجيل الدخول لإضافة ترجمة.",
        a1: "مستوى مبتدئ",
        a2: "مستوى أساسي",
        b1: "مستوى قبل المتوسط",
        b2: "مستوى المتوسط",
        c1: "مستوى فوق المتوسط",
        c2: "مستوى متقدم",
        add_translation: "إضافة ترجمة",
        sentence: "جملة",
        added_by: "ترجمة",
        listen: "إستماع",
        delete: "حذف"
    }
};
