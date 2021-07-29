import {CommonOption} from "../types/common-types";
import moment from "moment";


export const QualityList: CommonOption[] = [
    {name: "all", val: "all"},
    {
        name: "720p",
        val: "720p"
    },
    {
        name: "1080p",
        val: "1080p"
    }
];

export const RatingList: CommonOption[] = [{name: "all", val: "all"},];
for (let i = 1; i < 10; i++) {
    RatingList.push({
        name: `+${i}`,
        val: `+${i}`
    })
}

export const YearList: CommonOption[] = [{name: "all", val: "all"}];
for (let i = 0; i <= 20; i++) {
    YearList.push({
        name: `${moment().subtract(i,'years').year()}`,
        val: `${moment().subtract(i,'years').year()}`
    })
}

export const LanguageFilterList: CommonOption[] = [
    {name: "all", val: "all"},
    {name: "AR", val: "ar"},
    {name: "EN", val: "en"},
    {name: "FR", val: "fr"},
]
