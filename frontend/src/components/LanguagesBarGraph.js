import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

function LanguagesBarGraph({ data }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(!data.length);
    }, [data]);

    const languageNames = {
        aa: 'Afar',
        ab: 'Abjasio',
        ae: 'Avéstico',
        af: 'Afrikáans',
        ak: 'Akan',
        am: 'Amárico',
        an: 'Aragonés',
        ar: 'Árabe',
        as: 'Asamés',
        av: 'Ávaro',
        ay: 'Aimara',
        az: 'Azerbaiyano',
        ba: 'Baskir',
        be: 'Bielorruso',
        bg: 'Búlgaro',
        bh: 'Bhojpurí',
        bi: 'Bislama',
        bm: 'Bambara',
        bn: 'Bengalí',
        bo: 'Tibetano',
        br: 'Bretón',
        bs: 'Bosnio',
        ca: 'Catalán',
        ce: 'Checheno',
        ch: 'Chamorro',
        co: 'Corso',
        cr: 'Cree',
        cs: 'Checo',
        cu: 'Eslavo eclesiástico antiguo',
        cv: 'Chuvasio',
        cy: 'Galés',
        da: 'Danés',
        de: 'Alemán',
        dv: 'Maldivo',
        dz: 'Dzongkha',
        ee: 'Ewé',
        el: 'Griego',
        en: 'Inglés',
        eo: 'Esperanto',
        es: 'Español',
        et: 'Estonio',
        eu: 'Vasco',
        fa: 'Persa',
        ff: 'Fula',
        fi: 'Finés',
        fj: 'Fiyiano',
        fo: 'Feroés',
        fr: 'Francés',
        fy: 'Frisón occidental',
        ga: 'Irlandés',
        gd: 'Gaélico escocés',
        gl: 'Gallego',
        gn: 'Guaraní',
        gu: 'Guyaratí',
        gv: 'Manés',
        ha: 'Hausa',
        he: 'Hebreo',
        hi: 'Hindi',
        ho: 'Hiri motu',
        hr: 'Croata',
        ht: 'Haitiano',
        hu: 'Húngaro',
        hy: 'Armenio',
        hz: 'Herero',
        ia: 'Interlingua',
        id: 'Indonesio',
        ie: 'Interlingue',
        ig: 'Igbo',
        ii: 'Yi de Sichuán',
        ik: 'Iñupiaq',
        io: 'Ido',
        is: 'Islandés',
        it: 'Italiano',
        iu: 'Inuktitut',
        ja: 'Japonés',
        jv: 'Javanés',
        ka: 'Georgiano',
        kg: 'Kongo',
        ki: 'Kikuyu',
        kj: 'Kuanyama',
        kk: 'Kazajo',
        kl: 'Groenlandés',
        km: 'Jemer',
        kn: 'Canarés',
        ko: 'Coreano',
        kr: 'Kanuri',
        ks: 'Cachemiro',
        ku: 'Kurdo',
        kv: 'Komi',
        kw: 'Córnico',
        ky: 'Kirguís',
        la: 'Latín',
        lb: 'Luxemburgués',
        lg: 'Luganda',
        li: 'Limburgués',
        ln: 'Lingala',
        lo: 'Lao',
        lt: 'Lituano',
        lu: 'Luba-katanga',
        lv: 'Letón',
        mg: 'Malgache',
        mh: 'Marshalés',
        mi: 'Maorí',
        mk: 'Macedonio',
        ml: 'Malayalam',
        mn: 'Mongol',
        mo: 'Moldavo',
        mr: 'Maratí',
        ms: 'Malayo',
        mt: 'Maltés',
        my: 'Birmano',
        na: 'Nauruano',
        nb: 'Noruego bokmal',
        nd: 'Ndebele del norte',
        ne: 'Nepalí',
        ng: 'Ndonga',
        nl: 'Neerlandés',
        nn: 'Noruego nynorsk',
        no: 'Noruego',
        nr: 'Ndebele del sur',
        nv: 'Navajo',
        ny: 'Chichewa',
        oc: 'Occitano',
        oj: 'Ojibwa',
        om: 'Oromo',
        or: 'Oriya',
        os: 'Osético',
        pa: 'Panyabí',
        pi: 'Pali',
        pl: 'Polaco',
        ps: 'Pastú',
        pt: 'Portugués',
        qu: 'Quechua',
        rm: 'Romanche',
        rn: 'Kirundi',
        ro: 'Rumano',
        ru: 'Ruso',
        rw: 'Kinyarwanda',
        sa: 'Sánscrito',
        sc: 'Sardo',
        sd: 'Sindhi',
        se: 'Sami septentrional',
        sg: 'Sango',
        si: 'Cingalés',
        sk: 'Eslovaco',
        sl: 'Esloveno',
        sm: 'Samoano',
        sn: 'Shona',
        so: 'Somalí',
        sq: 'Albanés',
        sr: 'Serbio',
        ss: 'Suazi',
        st: 'Sesotho',
        su: 'Sundanés',
        sv: 'Sueco',
        sw: 'Suajili',
        ta: 'Tamil',
        te: 'Telugu',
        tg: 'Tayiko',
        th: 'Tailandés',
        ti: 'Tigriña',
        tk: 'Turcomano',
        tl: 'Tagalo',
        tn: 'Setsuana',
        to: 'Tongano',
        tr: 'Turco',
        ts: 'Tsonga',
        tt: 'Tártaro',
        tw: 'Twi',
        ty: 'Tahitiano',
        ug: 'Uigur',
        uk: 'Ucraniano',
        ur: 'Urdu',
        uz: 'Uzbeko',
        ve: 'Venda',
        vi: 'Vietnamita',
        vo: 'Volapük',
        wa: 'Valón',
        wo: 'Wolof',
        xh: 'Xhosa',
        yi: 'Yidis',
        yo: 'Yoruba',
        za: 'Zhuang',
        zh: 'Chino',
        zu: 'Zulú',
    };


    const sortedData = [...data].sort((a, b) => b.hours - a.hours).map(d => ({
        language: languageNames[d.language.split('-')[0]] || d.language,
        hours: d.hours
    }));

    const chartData = {
        labels: sortedData.slice(0, 10).map(d => d.language),
        datasets: [{
            label: 'Horas',
            data: sortedData.map(d => d.hours),
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1
        }]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false,
            }
        }
    };

    return (
        <>
            {isLoading ? (
                <p className="loader">Cargando...</p>
            ) : (
                <>
                    <h1>Lenguajes más usados</h1>
                    <Bar data={chartData} options={options} />
                </>
            )}
        </>
    );

}

export default LanguagesBarGraph;