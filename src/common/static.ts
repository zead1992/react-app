import {CommonOption} from "../types/common-types";
import moment from "moment";


export const QualityList: CommonOption[] = [
    {
        name: "720p",
        val: "720p"
    },
    {
        name: "1080p",
        val: "1080p"
    }
];
export const QualityListFilter : CommonOption[] = [
    {name: "all", val: "all"},...QualityList
]

export const RatingList: CommonOption[] = [];
for (let i = 1; i < 10; i++) {
    RatingList.push({
        name: `+${i}`,
        val: `+${i}`
    })
}
export const RatingListFilter : CommonOption[] = [{name: "all", val: "all"},...RatingList];

export const YearList: CommonOption[] = [];
for (let i = 0; i <= 20; i++) {
    YearList.push({
        name: `${moment().subtract(i,'years').year()}`,
        val: `${moment().subtract(i,'years').year()}`
    })
}
export const YearListFilter : CommonOption[] = [{name: "all", val: "all"},...YearList]

export const LangList: CommonOption[] = [
    {name: "AR", val: "ar"},
    {name: "EN", val: "en"},
    {name: "FR", val: "fr"},
]
export const LangListFilter : CommonOption[] = [{name: "all", val: "all"},...LangList]