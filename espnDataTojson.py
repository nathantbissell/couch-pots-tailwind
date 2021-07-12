import json


data = {}
data['players'] = []
with open('teESPNRawData.json') as json_file:
    res = json.load(json_file)
    playerListings = res['players']
    for x in playerListings:
        listing = x['player']
        name = listing['fullName']
        potsAuctionPrice = x['keeperValueFuture']
        totalPts = listing['stats'][2]['appliedTotal']
        avg = listing['stats'][2]['appliedAverage']
        bio = listing['seasonOutlook']
        otherLeagueAvgValue = round(listing['ownership']['auctionValueAverage'], 2)
        playerDict = {'name': name, 'auctionPrice': potsAuctionPrice, 'totalPoints': totalPts, 'average': avg, 'bio': bio, 'otherLeagueDraftValue': otherLeagueAvgValue }
        data['players'].append(playerDict)

print(data)

with open('te.json', 'w') as outfile:
    json.dump(data, outfile)