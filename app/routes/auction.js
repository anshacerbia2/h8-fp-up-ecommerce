const router = require('express').Router();
const AuctionController = require('../controllers/AuctionController');
const AuthorizationAuction = require('../middlewares/authorizationAuction');
const UserAuthentication = require('../middlewares/authentication');

router.get('/', AuctionController.approvedAuctions);
router.get('/pending', AuctionController.unapprovedAuctions);
router.get('/archived', AuctionController.archivedAuctions);
router.post('/', UserAuthentication, AuctionController.createAuction);
router.get('/:id', UserAuthentication, AuctionController.approvedAuctionsById);
router.patch('/:id/bid', UserAuthentication, AuctionController.updateBid);
router.patch('/:id', UserAuthentication, AuthorizationAuction, AuctionController.approveAuction);
router.put('/:id', UserAuthentication, AuthorizationAuction, AuctionController.archiveAuction);

module.exports = router;