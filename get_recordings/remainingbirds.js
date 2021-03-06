const birdsIwant = require("./birdlist");
const dbjson = require("./db.json");
const birdsIgot = dbjson.birds;

const remainingBirds = birdsIwant.filter((bird) => {
  return birdsIgot.every((gottenbird) => gottenbird.en !== bird.en);
});

console.log(remainingBirds);
const pass1 = [
  { en: "Long-tailed Duck", jp: "コオリガモ" },
  { en: "Grey Heron", jp: "アオサギ" },
  { en: "Eastern Curlew", jp: "ホウロクシギ" },
  { en: "Eurasian Hobby", jp: "チゴハヤブサ" },
  { en: "Ashy Minivet", jp: "サンショウクイ" },
  { en: "Bull-headed Shrike", jp: "モズ" },
  { en: "Eurasian Jay", jp: "カケス" },
  { en: "Rook", jp: "ミヤマガラス" },
  { en: "Carrion Crow", jp: "ハシボソガラス" },
  { en: "Large-billed Crow", jp: "ハシブトガラス" },
  { en: "Goldcrest", jp: "キクイタダキ" },
  { en: "Marsh Tit", jp: "ハシブトガラ" },
  { en: "Willow Tit", jp: "コガラ" },
  { en: "Eurasian Skylark", jp: "ヒバリ" },
  { en: "Barn Swallow", jp: "ツバメ" },
  { en: "Pacific Swallow", jp: "リュウキュウツバメ" },
  { en: "Red-rumped Swallow", jp: "コシアカツバメ" },
  { en: "Asian House Martin", jp: "イワツバメ" },
  { en: "Long-tailed Tit", jp: "エナガ" },
  { en: "Kamchatka Leaf Warbler", jp: "オオムシクイ" },
  { en: "Japanese Leaf Warbler", jp: "メボソムシクイ" },
  { en: "Sakhalin Leaf Warbler", jp: "エゾムシクイ" },
  { en: "Middendorff's Grasshopper Warbler", jp: "シマセンニュウ" },
  { en: "Styan's Grasshopper Warbler", jp: "ウチヤマセンニュウ" },
  { en: "Marsh Grassbird", jp: "オオセッカ" },
  { en: "Gray's Grasshopper Warbler", jp: "エゾセンニュウ" },
  { en: "Oriental Reed Warbler", jp: "オオヨシキリ" },
  { en: "Zitting Cisticola", jp: "セッカ" },
  { en: "Eurasian Treecreeper", jp: "キバシリ" },
  { en: "Eurasian Wren", jp: "ミソサザイ" },
  { en: "Japanese Thrush", jp: "クロツグミ" },
  { en: "Eyebrowed Thrush", jp: "マミチャジナイ" },
  { en: "Pale Thrush", jp: "シロハラ" },
  { en: "Naumann's Thrush", jp: "ツグミ" },
  { en: "Red-flanked Bluetail", jp: "ルリビタキ" },
  { en: "Daurian Redstart", jp: "ジョウビタキ" },
  { en: "Blue Rock Thrush", jp: "イソヒヨドリ" },
  { en: "Dark-sided Flycatcher", jp: "サメビタキ" },
  { en: "Asian Brown Flycatcher", jp: "コサメビタキ" },
  { en: "Narcissus Flycatcher", jp: "キビタキ" },
  { en: "Mugimaki Flycatcher", jp: "ムギマキ" },
  { en: "Taiga Flycatcher", jp: "オジロビタキ" },
  { en: "Blue-and-white Flycatcher", jp: "オオルリ" },
  { en: "Japanese Accentor", jp: "カヤクグリ" },
  { en: "Russet Sparrow", jp: "ニュウナイスズメ" },
  { en: "Eurasian Tree Sparrow", jp: "スズメ" },
  { en: "White Wagtail", jp: "ハクセキレイ" },
  { en: "Japanese Wagtail", jp: "セグロセキレイ" },
  { en: "Richard's Pipit", jp: "マミジロタヒバリ" },
  { en: "Olive-backed Pipit", jp: "ビンズイ" },
  { en: "Buff-bellied Pipit", jp: "タヒバリ" },
  { en: "Brambling", jp: "アトリ" },
  { en: "Grey-capped Greenfinch", jp: "カワラヒワ" },
  { en: "Eurasian Siskin", jp: "マヒワ" },
  { en: "Common Redpoll", jp: "ベニヒワ" },
  { en: "Asian Rosy Finch", jp: "ハギマシコ" },
  { en: "Long-tailed Rosefinch", jp: "ベニマシコ" },
  { en: "Common Rosefinch", jp: "アカマシコ" },
  { en: "Pallas's Rosefinch", jp: "オオマシコ" },
  { en: "Red Crossbill", jp: "イスカ" },
  { en: "Two-barred Crossbill", jp: "ナキイスカ" },
  { en: "Eurasian Bullfinch", jp: "ウソ" },
  { en: "Hawfinch", jp: "シメ" },
  { en: "Japanese Grosbeak", jp: "イカル" },
  { en: "Chestnut-eared Bunting", jp: "ホオアカ" },
  { en: "Rustic Bunting", jp: "カシラダカ" },
  { en: "Yellow-breasted Bunting", jp: "シマアオジ" },
  { en: "Yellow Bunting", jp: "ノジコ" },
  { en: "Grey Bunting", jp: "クロジ" },
  { en: "Japanese Reed Bunting", jp: "コジュリン" },
  { en: "Common Reed Bunting", jp: "オオジュリン" },
  { en: "Chinese Bamboo Partridge", jp: "コジュケイ" },
  { en: "Chinese Hwamei", jp: "ガビチョウ" },
  { en: "Crested Myna", jp: "ハッカチョウ" },
  { en: "Eurasian Magpie", jp: "カササギ" },
  { en: "Japanese White-eye", jp: "メジロ" },
  { en: "Masked Laughingthrush", jp: "カオグロガビチョウ" },
  { en: "Mute Swan", jp: "コブハクチョウ" },
  { en: "Oriental Stork", jp: "コウノトリ" },
  { en: "Red-billed Leiothrix", jp: "ソウシチョウ" },
  { en: "Rock Dove", jp: "ドバト" },
];

//Weird! They use "Warbling white-eye" and not "Japanese White-eye"
//Other 2 are probably connection overload or whatever happened in pass1
const pass2 = [
  { en: "Eastern Curlew", jp: "ホウロクシギ" },
  { en: "Crested Myna", jp: "ハッカチョウ" },
  { en: "Warbling white-eye", jp: "メジロ" },
];

//I need to manually get Crested Myna, keep getting Golden Crested Myna instead
//Eastern Curlew (Far Eastern Curlew) and "warbling white-eye" OK

module.exports = pass2;
